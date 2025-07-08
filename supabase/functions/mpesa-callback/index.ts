import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MpesaCallbackRequest {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata?: {
        Item: Array<{
          Name: string
          Value: string | number
        }>
      }
    }
  }
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

    const callbackData: MpesaCallbackRequest = await req.json()
    console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2))

    const stkCallback = callbackData.Body.stkCallback
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc

    // Find the payment record
    const { data: payment, error: findError } = await supabase
      .from('payments')
      .select('*')
      .eq('stripe_session_id', checkoutRequestId)
      .single()

    if (findError || !payment) {
      console.error('Payment record not found:', findError)
      return new Response(
        JSON.stringify({ ResultCode: 1, ResultDesc: 'Payment record not found' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Update payment status based on callback result
    const isSuccess = resultCode === 0
    const newStatus = isSuccess ? 'completed' : 'failed'

    let transactionId = null
    let mpesaAmount = null
    let mpesaPhone = null

    // Extract transaction details if payment was successful
    if (isSuccess && stkCallback.CallbackMetadata) {
      const metadata = stkCallback.CallbackMetadata.Item
      
      const receiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value
      const transactionDate = metadata.find(item => item.Name === 'TransactionDate')?.Value
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value
      const amount = metadata.find(item => item.Name === 'Amount')?.Value

      transactionId = receiptNumber as string
      mpesaAmount = amount as number
      mpesaPhone = phoneNumber as string

      console.log(`Payment successful: Receipt ${receiptNumber}, Amount ${amount}, Phone ${phoneNumber}`)
    }

    // Update payment record
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: newStatus,
        stripe_session_id: transactionId || checkoutRequestId // Use M-Pesa receipt number if available
      })
      .eq('id', payment.id)

    if (updateError) {
      console.error('Failed to update payment:', updateError)
    } else {
      console.log(`Payment ${payment.id} updated to status: ${newStatus}`)
    }

    // If payment successful, update subscription
    if (isSuccess) {
      const subscriptionEnd = new Date()
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1) // Add 1 month

      // Get user email from auth
      const { data: userData } = await supabase.auth.admin.getUserById(payment.user_id)
      const userEmail = userData?.user?.email || ''

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: payment.user_id,
          email: userEmail,
          subscribed: true,
          subscription_tier: 'Premium', // Default to Premium for M-Pesa payments
          subscription_end: subscriptionEnd.toISOString()
        })

      if (subscriptionError) {
        console.error('Subscription update error:', subscriptionError)
      } else {
        console.log(`Subscription updated for user ${payment.user_id}`)
      }
    }

    // Respond to Safaricom
    return new Response(
      JSON.stringify({
        ResultCode: 0,
        ResultDesc: 'Callback processed successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error: any) {
    console.error('M-Pesa callback error:', error)
    return new Response(
      JSON.stringify({
        ResultCode: 1,
        ResultDesc: 'Callback processing failed'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Still return 200 to Safaricom
      }
    )
  }
})