import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MpesaPaymentRequest {
  phoneNumber: string
  amount: number
  userId: string
  subscriptionTier: string
}

// Generate access token for Daraja API
async function getAccessToken(): Promise<string> {
  const consumerKey = Deno.env.get('DARAJA_CONSUMER_KEY')
  const consumerSecret = Deno.env.get('DARAJA_CONSUMER_SECRET')
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing Daraja API credentials')
  }

  const auth = btoa(`${consumerKey}:${consumerSecret}`)
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const data = await response.json()
  return data.access_token
}

// Generate timestamp in the format required by Daraja
function generateTimestamp(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

// Generate password for STK Push
function generatePassword(businessShortCode: string, passkey: string, timestamp: string): string {
  const data = businessShortCode + passkey + timestamp
  return btoa(data)
}

// Initiate STK Push
async function initiateSTKPush(phoneNumber: string, amount: number, accessToken: string): Promise<any> {
  const businessShortCode = Deno.env.get('DARAJA_BUSINESS_SHORTCODE')
  const passkey = Deno.env.get('DARAJA_PASSKEY')
  
  if (!businessShortCode || !passkey) {
    throw new Error('Missing business shortcode or passkey')
  }

  const timestamp = generateTimestamp()
  const password = generatePassword(businessShortCode, passkey, timestamp)

  // Format phone number (ensure it starts with 254)
  let formattedPhone = phoneNumber.replace(/^\+/, '')
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1)
  } else if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone
  }

  const stkPushData = {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: formattedPhone,
    PartyB: businessShortCode,
    PhoneNumber: formattedPhone,
    CallBackURL: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mpesa-callback`,
    AccountReference: "HarakaAfya",
    TransactionDesc: "Haraka Afya Subscription Payment"
  }

  const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stkPushData),
  })

  if (!response.ok) {
    throw new Error('Failed to initiate STK Push')
  }

  return await response.json()
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

    const { phoneNumber, amount, userId, subscriptionTier }: MpesaPaymentRequest = await req.json()

    console.log(`M-Pesa payment request: ${phoneNumber}, Amount: ${amount}, User: ${userId}`)

    // Get access token from Daraja API
    const accessToken = await getAccessToken()
    console.log('Access token obtained successfully')

    // Initiate STK Push
    const stkResponse = await initiateSTKPush(phoneNumber, amount, accessToken)
    console.log('STK Push response:', stkResponse)

    // Check if STK Push was successful
    if (stkResponse.ResponseCode === "0") {
      const checkoutRequestId = stkResponse.CheckoutRequestID
      
      // Record payment as pending in database
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          amount: amount * 100, // Store in cents
          currency: 'KES',
          payment_method: 'mpesa',
          status: 'pending',
          stripe_session_id: checkoutRequestId
        })

      if (paymentError) {
        console.error('Payment record error:', paymentError)
        throw new Error('Failed to record payment')
      }

      return new Response(
        JSON.stringify({
          success: true,
          checkoutRequestId,
          message: 'STK Push sent successfully. Please check your phone and enter your M-Pesa PIN.',
          status: 'pending'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      throw new Error(stkResponse.errorMessage || 'STK Push failed')
    }

  } catch (error: any) {
    console.error('M-Pesa payment error:', error)
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