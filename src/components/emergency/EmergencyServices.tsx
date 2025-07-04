
import React, { useState } from 'react';
import { Phone, Ambulance, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface EmergencyServiceProps {
  onClose: () => void;
}

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'general' | 'hospital' | 'police' | 'fire';
  ambulancesAvailable: number;
  ambulancesInUse: number;
  ambulancesEnRoute: number;
  estimatedWaitTime: string;
  location: string;
}

const EmergencyServices: React.FC<EmergencyServiceProps> = ({ onClose }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 'general-911',
      name: 'General Emergency',
      number: '911',
      type: 'general',
      ambulancesAvailable: 5,
      ambulancesInUse: 3,
      ambulancesEnRoute: 2,
      estimatedWaitTime: '8-12 min',
      location: 'Citywide'
    },
    {
      id: 'aga-khan',
      name: 'Aga Khan Hospital',
      number: '+254 20 366 2000',
      type: 'hospital',
      ambulancesAvailable: 3,
      ambulancesInUse: 1,
      ambulancesEnRoute: 0,
      estimatedWaitTime: '5-8 min',
      location: 'Parklands'
    },
    {
      id: 'nairobi-hospital',
      name: 'Nairobi Hospital',
      number: '+254 20 284 5000',
      type: 'hospital',
      ambulancesAvailable: 4,
      ambulancesInUse: 2,
      ambulancesEnRoute: 1,
      estimatedWaitTime: '6-10 min',
      location: 'Upper Hill'
    },
    {
      id: 'kenyatta',
      name: 'Kenyatta National Hospital',
      number: '+254 20 272 6300',
      type: 'hospital',
      ambulancesAvailable: 8,
      ambulancesInUse: 5,
      ambulancesEnRoute: 3,
      estimatedWaitTime: '10-15 min',
      location: 'Dagoretti'
    },
    {
      id: 'mp-shah',
      name: 'MP Shah Hospital',
      number: '+254 20 428 0000',
      type: 'hospital',
      ambulancesAvailable: 2,
      ambulancesInUse: 1,
      ambulancesEnRoute: 0,
      estimatedWaitTime: '7-12 min',
      location: 'Parklands'
    }
  ];

  const handleCall = (number: string, name: string) => {
    // In a real app, this would initiate a phone call
    if (window.confirm(`Call ${name} at ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const getAvailabilityColor = (available: number, inUse: number) => {
    const total = available + inUse;
    const availabilityRatio = available / total;
    
    if (availabilityRatio > 0.6) return 'text-green-600 bg-green-50';
    if (availabilityRatio > 0.3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Emergency Services</h2>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>

          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {contact.location}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(contact.ambulancesAvailable, contact.ambulancesInUse)}`}>
                    {contact.ambulancesAvailable} Available
                  </span>
                </div>

                {/* Ambulance Status */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Ambulance className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-green-600 font-semibold">{contact.ambulancesAvailable}</p>
                    <p className="text-gray-500">Available</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Ambulance className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-red-600 font-semibold">{contact.ambulancesInUse}</p>
                    <p className="text-gray-500">In Use</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Ambulance className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-blue-600 font-semibold">{contact.ambulancesEnRoute}</p>
                    <p className="text-gray-500">En Route</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Est. Wait: {contact.estimatedWaitTime}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCall(contact.number, contact.name)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Emergency Tip</p>
                <p className="text-sm text-yellow-700 mt-1">
                  If you're experiencing chest pain, difficulty breathing, or severe bleeding, call immediately. Don't wait!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
