import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AirtelPaymentRequest {
  phoneNumber: string
  amount: number
  userId: string
  subscriptionTier: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { phoneNumber, amount, userId, subscriptionTier }: AirtelPaymentRequest = await req.json()

    console.log(`Airtel Money payment request: ${phoneNumber}, Amount: ${amount}, User: ${userId}`)

    // Simulate Airtel Money payment processing
    const transactionId = `AIRTEL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Simulate payment success/failure (85% success rate for demo)
    const isSuccess = Math.random() > 0.15
    const status = isSuccess ? 'completed' : 'failed'

    // Record payment in database
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: amount * 100, // Store in cents
        currency: 'KES',
        payment_method: 'airtel_money',
        status: status,
        stripe_session_id: transactionId
      })

    if (paymentError) {
      console.error('Payment record error:', paymentError)
      throw new Error('Failed to record payment')
    }

    // If payment successful, update subscription
    if (isSuccess) {
      const subscriptionEnd = new Date()
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1) // Add 1 month

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          email: '', // Will be filled by trigger or separate query
          subscribed: true,
          subscription_tier: subscriptionTier,
          subscription_end: subscriptionEnd.toISOString()
        })

      if (subscriptionError) {
        console.error('Subscription update error:', subscriptionError)
      }
    }

    return new Response(
      JSON.stringify({
        success: isSuccess,
        transactionId,
        status,
        message: isSuccess 
          ? `Payment of KES ${amount} successful via Airtel Money` 
          : 'Payment failed. Please check your Airtel Money balance and try again.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: isSuccess ? 200 : 400,
      }
    )

  } catch (error) {
    console.error('Airtel Money payment error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Payment processing failed'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})