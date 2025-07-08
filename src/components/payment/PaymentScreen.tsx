import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentScreenProps {
  onBack: () => void;
  selectedPlan?: {
    id: string;
    name: string;
    price: number;
  };
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack, selectedPlan }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [step, setStep] = useState<'select' | 'details' | 'processing' | 'success'>('select');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    phoneNumber: '',
    amount: selectedPlan?.price?.toString() || '2500'
  });
  const [transactionId, setTransactionId] = useState<string>('');
  const { toast } = useToast();

  // Poll payment status for M-Pesa/Airtel payments
  const pollPaymentStatus = async (checkoutRequestId: string) => {
    const maxAttempts = 30; // Poll for up to 5 minutes (30 attempts * 10 seconds)
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const { data: payment, error } = await supabase
          .from('payments')
          .select('status')
          .eq('stripe_session_id', checkoutRequestId)
          .single();

        if (!error && payment) {
          if (payment.status === 'completed') {
            setStep('success');
            toast({
              title: "Payment successful!",
              description: "Your M-Pesa payment has been confirmed.",
            });
            return;
          } else if (payment.status === 'failed') {
            setStep('details');
            toast({
              title: "Payment failed",
              description: "Your payment was not successful. Please try again.",
              variant: "destructive",
            });
            return;
          }
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          // Timeout - show timeout message
          setStep('details');
          toast({
            title: "Payment timeout",
            description: "Payment verification timed out. Please check your M-Pesa messages or try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000);
        }
      }
    };

    // Start polling after 5 seconds delay to allow initial processing
    setTimeout(checkStatus, 5000);
  };

  const paymentMethods = [
    { 
      id: 'visa', 
      name: 'Visa Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
      color: 'bg-blue-600' 
    },
    { 
      id: 'mpesa', 
      name: 'M-Pesa', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg',
      color: 'bg-green-600' 
    },
    { 
      id: 'airtel', 
      name: 'Airtel Money', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Airtel_logo_logotype_emblem.png/200px-Airtel_logo_logotype_emblem.png',
      color: 'bg-red-600' 
    },
    { 
      id: 'stripe', 
      name: 'Stripe Payment', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
      color: 'bg-purple-600' 
    }
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('details');
  };

  const handlePayment = async () => {
    setStep('processing');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to complete payment.",
          variant: "destructive",
        });
        return;
      }

      let paymentResult;
      
      if (selectedMethod === 'mpesa') {
        paymentResult = await supabase.functions.invoke('mpesa-payment', {
          body: {
            phoneNumber: paymentDetails.phoneNumber,
            amount: parseFloat(paymentDetails.amount),
            userId: user.id,
            subscriptionTier: selectedPlan?.name || 'Premium'
          }
        });
      } else if (selectedMethod === 'airtel') {
        paymentResult = await supabase.functions.invoke('airtel-payment', {
          body: {
            phoneNumber: paymentDetails.phoneNumber,
            amount: parseFloat(paymentDetails.amount),
            userId: user.id,
            subscriptionTier: selectedPlan?.name || 'Premium'
          }
        });
      } else if (selectedMethod === 'stripe' || selectedMethod === 'visa') {
        // Use existing Stripe checkout
        paymentResult = await supabase.functions.invoke('create-checkout', {
          body: {
            priceId: selectedPlan?.id === 'premium' ? 'price_premium' : 'price_family',
            successUrl: `${window.location.origin}/`,
            cancelUrl: `${window.location.origin}/subscription`
          }
        });
        
        if (paymentResult.data?.url) {
          window.location.href = paymentResult.data.url;
          return;
        }
      }

      if (paymentResult?.data?.success) {
        if (paymentResult.data.status === 'pending') {
          // For M-Pesa, show pending state and poll for completion
          setTransactionId(paymentResult.data.checkoutRequestId || paymentResult.data.transactionId);
          setStep('processing');
          toast({
            title: "Payment initiated",
            description: paymentResult.data.message,
          });
          
          // Poll for payment completion (M-Pesa specific)
          if (selectedMethod === 'mpesa' || selectedMethod === 'airtel') {
            pollPaymentStatus(paymentResult.data.checkoutRequestId || paymentResult.data.transactionId);
          }
        } else {
          setTransactionId(paymentResult.data.transactionId);
          setStep('success');
          toast({
            title: "Payment successful!",
            description: paymentResult.data.message,
          });
        }
      } else {
        throw new Error(paymentResult?.data?.message || 'Payment failed');
      }
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setStep('details');
      toast({
        title: "Payment failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'visa':
      case 'stripe':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={paymentDetails.name}
                onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        );
      case 'mpesa':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Phone Number</label>
              <input
                type="tel"
                placeholder="254712345678"
                value={paymentDetails.phoneNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter your phone number in format: 254XXXXXXXXX</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-800">
                <strong>Live M-Pesa:</strong> A payment request will be sent to your phone. Please enter your M-Pesa PIN when prompted.
              </p>
            </div>
          </div>
        );
      case 'airtel':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Airtel Money Number</label>
              <input
                type="tel"
                placeholder="254712345678"
                value={paymentDetails.phoneNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter your phone number in format: 254XXXXXXXXX</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-sm text-red-800">
                <strong>Test Mode:</strong> This is a demo payment. In production, a payment request would be sent to your phone.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your payment of KSh {paymentDetails.amount} has been processed successfully.
          </p>
          {transactionId && (
            <p className="text-sm text-gray-500 mb-8">
              Transaction ID: {transactionId}
            </p>
          )}
          <Button onClick={onBack} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {selectedMethod === 'mpesa' ? 'Waiting for M-Pesa Payment...' : 
             selectedMethod === 'airtel' ? 'Processing Airtel Money...' : 
             'Processing Payment...'}
          </h2>
          <p className="text-gray-600">
            {selectedMethod === 'mpesa' ? 'Please check your phone and enter your M-Pesa PIN to complete the payment' :
             selectedMethod === 'airtel' ? 'Please wait while we process your Airtel Money payment' :
             'Please wait while we process your payment'}
          </p>
          {(selectedMethod === 'mpesa' || selectedMethod === 'airtel') && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">This may take up to 2 minutes. Please do not close this page.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-gold/5">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={step === 'select' ? onBack : () => setStep('select')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            {step === 'select' ? 'Payment Method' : 'Payment Details'}
          </h1>
          <div></div>
        </div>
      </div>

      <div className="p-6">
        {step === 'select' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
              <p className="text-gray-600 mb-6">Select your preferred payment option</p>
              <div className="bg-primary/5 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-primary">KSh {paymentDetails.amount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 flex items-center space-x-4"
                >
                  <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                    <img 
                      src={method.logo} 
                      alt={method.name}
                      className="max-w-12 max-h-8 object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.textContent = method.name.charAt(0);
                      }}
                    />
                    <span className="hidden text-xs font-bold text-gray-600"></span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-500">
                      {method.id === 'mpesa' && 'Pay with M-Pesa'}
                      {method.id === 'airtel' && 'Pay with Airtel Money'}
                      {method.id === 'visa' && 'Pay with Visa Card'}
                      {method.id === 'stripe' && 'Pay with Stripe'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Payment Details</h2>
            {renderPaymentForm()}
            <div className="mt-8">
              <Button onClick={handlePayment} className="w-full py-4">
                Pay KSh {paymentDetails.amount}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
