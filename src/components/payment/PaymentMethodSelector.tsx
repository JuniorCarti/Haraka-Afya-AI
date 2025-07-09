import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { VisaLogo, MpesaLogo, AirtelMoneyLogo, StripeLogo } from '../ui/payment-logos';

interface PaymentMethod {
  id: string;
  name: string;
  logo: React.ComponentType;
  description: string;
  available: boolean;
}

interface PaymentMethodSelectorProps {
  onBack: () => void;
  onSelectMethod: (methodId: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  onBack, 
  onSelectMethod 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      logo: StripeLogo,
      description: 'Pay securely with your credit or debit card via Stripe',
      available: true
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      logo: MpesaLogo,
      description: 'Pay instantly with M-Pesa mobile money',
      available: true
    },
    {
      id: 'visa',
      name: 'Visa Card',
      logo: VisaLogo,
      description: 'Pay with your Visa credit or debit card',
      available: true
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      logo: AirtelMoneyLogo,
      description: 'Pay with Airtel Money mobile payment',
      available: false // Demo mode
    }
  ];

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      onSelectMethod(selectedMethod);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-gold/5">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Payment Method</h1>
          <div></div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
          <p className="text-gray-600">Select your preferred way to pay</p>
        </div>

        <div className="space-y-4 mb-8">
          {paymentMethods.map((method) => {
            const LogoComponent = method.logo;
            return (
              <button
                key={method.id}
                onClick={() => method.available && handleSelectMethod(method.id)}
                disabled={!method.available}
                className={`w-full bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-200 ${
                  selectedMethod === method.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-gray-100 hover:border-primary/20'
                } ${
                  !method.available 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                    <LogoComponent />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{method.name}</span>
                      {!method.available && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Demo
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary' 
                      : 'border-gray-200'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Security & Trust</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• All payments are secured with industry-standard encryption</p>
            <p>• Your payment information is never stored on our servers</p>
            <p>• M-Pesa payments are processed through Safaricom's secure API</p>
            <p>• 24/7 customer support for payment issues</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <Button 
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="w-full py-4 text-lg font-semibold"
        >
          Continue with {selectedMethod ? paymentMethods.find(m => m.id === selectedMethod)?.name : 'Selected Method'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;