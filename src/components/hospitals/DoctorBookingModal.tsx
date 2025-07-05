
import React, { useState } from 'react';
import { X, Phone, Video, Clock, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string;
  rating: number;
}

interface DoctorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

const DoctorBookingModal: React.FC<DoctorBookingModalProps> = ({ isOpen, onClose, doctor }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa');

  if (!isOpen) return null;

  const callOptions = [
    {
      id: 'free-call',
      title: 'Free Call',
      duration: '5 minutes',
      price: 'Free',
      features: ['Basic consultation', 'Limited time', 'Audio only'],
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'video-call',
      title: 'Video Call',
      duration: '10 minutes',
      price: 'KSh 200',
      features: ['Video consultation', 'Screen sharing', 'Basic diagnosis'],
      icon: Video,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'extended-call',
      title: 'Extended Video Call',
      duration: '30 minutes',
      price: 'KSh 500',
      features: ['Extended consultation', 'Detailed diagnosis', 'Follow-up notes', 'Prescription'],
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: Smartphone },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard }
  ];

  const handleBooking = () => {
    if (!selectedOption) {
      alert('Please select a call option');
      return;
    }

    const option = callOptions.find(opt => opt.id === selectedOption);
    if (option?.price !== 'Free' && !paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Simulate booking process
    alert(`Booking confirmed!\nDoctor: ${doctor.name}\nType: ${option?.title}\nDuration: ${option?.duration}\nPrice: ${option?.price}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="border-b p-4 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">Book Session</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-green-600">{doctor.availability}</p>
          </div>

          {/* Call Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Select Consultation Type</h4>
            <div className="space-y-3">
              {callOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedOption === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center`}>
                      <option.icon className={`w-5 h-5 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{option.title}</h5>
                        <span className="font-bold text-primary">{option.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{option.duration}</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {option.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          {selectedOption && callOptions.find(opt => opt.id === selectedOption)?.price !== 'Free' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Button */}
          <Button 
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {selectedOption && callOptions.find(opt => opt.id === selectedOption)?.price === 'Free'
              ? 'Start Free Call'
              : 'Book & Pay'}
          </Button>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our terms of service. Free calls are limited and may end automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingModal;
