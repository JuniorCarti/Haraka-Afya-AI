
import React, { useState } from 'react';
import { ArrowLeft, Check, Crown, Star } from 'lucide-react';
import { Button } from '../ui/button';

interface SubscriptionPlansScreenProps {
  onBack: () => void;
  onSelectPlan: (planId: string) => void;
}

const SubscriptionPlansScreen: React.FC<SubscriptionPlansScreenProps> = ({ onBack, onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      period: 'Forever',
      description: 'Basic health tips and limited AI consultations',
      features: [
        '5 AI consultations per month',
        'Basic health tips',
        'Symptom checker',
        'Find nearby hospitals'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '2,500',
      period: 'per month',
      description: 'Unlimited AI consultations and advanced features',
      features: [
        'Unlimited AI consultations',
        'Personalized health insights',
        'Medication reminders',
        'Health history tracking',
        'Priority support',
        'Telemedicine consultations'
      ],
      popular: true,
      color: 'border-primary'
    },
    {
      id: 'family',
      name: 'Family',
      price: '4,000',
      period: 'per month',
      description: 'Perfect for families with up to 6 members',
      features: [
        'Everything in Premium',
        'Up to 6 family members',
        'Family health dashboard',
        'Shared medication tracking',
        'Emergency contacts',
        'Family health reports'
      ],
      popular: false,
      color: 'border-gold'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-gold/5">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Choose Your Plan</h1>
          <div></div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Premium Healthcare</h2>
          <p className="text-gray-600">Choose the plan that works best for you</p>
        </div>

        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 ${
                selectedPlan === plan.id ? plan.color : 'border-gray-100'
              } ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <span>{plan.name}</span>
                    {plan.id === 'family' && <Crown className="w-5 h-5 text-gold" />}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    KSh {plan.price}
                  </div>
                  <div className="text-sm text-gray-500">{plan.period}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="w-full"
                onClick={() => {
                  setSelectedPlan(plan.id);
                  if (plan.id !== 'free') {
                    onSelectPlan(plan.id);
                  }
                }}
              >
                {plan.id === 'free' ? 'Current Plan' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Why Choose Premium?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Get unlimited access to AI-powered health consultations</p>
            <p>• Receive personalized health insights and recommendations</p>
            <p>• Track your health journey with detailed analytics</p>
            <p>• Connect with certified healthcare professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansScreen;
