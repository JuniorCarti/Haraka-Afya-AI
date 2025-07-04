
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Phone, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentScreenProps {
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [step, setStep] = useState<'select' | 'details' | 'processing' | 'success'>('select');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    phoneNumber: '',
    amount: '2500'
  });

  const paymentMethods = [
    { id: 'visa', name: 'Visa Card', icon: CreditCard, color: 'bg-blue-600' },
    { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, color: 'bg-green-600' },
    { id: 'airtel', name: 'Airtel Money', icon: Phone, color: 'bg-red-600' },
    { id: 'stripe', name: 'Stripe Payment', icon: CreditCard, color: 'bg-purple-600' }
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('details');
  };

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 3000);
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
              />
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-800">
                A payment request will be sent to your phone. Enter your M-Pesa PIN to complete the transaction.
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
              />
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-sm text-red-800">
                A payment request will be sent to your phone. Enter your Airtel Money PIN to complete the transaction.
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
          <p className="text-gray-600 mb-8">
            Your payment of KSh {paymentDetails.amount} has been processed successfully.
          </p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Processing Payment...</h2>
          <p className="text-gray-600">Please wait while we process your payment</p>
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
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 flex items-center space-x-4"
                  >
                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
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
                );
              })}
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
