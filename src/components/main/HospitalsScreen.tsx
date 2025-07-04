
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Filter, Navigation, Clock } from 'lucide-react';
import { Button } from '../ui/button';

interface HospitalsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Hospital {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  address: string;
  phone: string;
  services: string[];
  isEmergency: boolean;
  isOpen24h: boolean;
}

const HospitalsScreen: React.FC<HospitalsScreenProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'Kenyatta University Teaching Hospital',
      type: 'Public Hospital',
      distance: '2.3 km',
      rating: 4.2,
      address: 'Thika Road, Ruiru',
      phone: '+254 20 2722000',
      services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
      isEmergency: true,
      isOpen24h: true
    },
    {
      id: '2',
      name: 'Nairobi Hospital',
      type: 'Private Hospital',
      distance: '5.1 km',
      rating: 4.7,
      address: 'Argwings Kodhek Road',
      phone: '+254 20 2845000',
      services: ['Cardiology', 'Oncology', 'Surgery', 'Emergency'],
      isEmergency: true,
      isOpen24h: true
    },
    {
      id: '3',
      name: 'Mama Lucy Kibaki Hospital',
      type: 'Public Hospital',
      distance: '3.8 km',
      rating: 3.9,
      address: 'Kangundo Road, Embakasi',
      phone: '+254 20 2763000',
      services: ['Maternity', 'Emergency', 'General Medicine'],
      isEmergency: true,
      isOpen24h: true
    },
    {
      id: '4',
      name: 'Karen Hospital',
      type: 'Private Hospital',
      distance: '8.2 km',
      rating: 4.5,
      address: 'Karen Road, Karen',
      phone: '+254 20 6600000',
      services: ['Surgery', 'Dermatology', 'Orthopedics'],
      isEmergency: false,
      isOpen24h: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Hospitals' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'public', label: 'Public' },
    { id: 'private', label: 'Private' }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    switch (selectedFilter) {
      case 'emergency':
        return hospital.isEmergency;
      case 'public':
        return hospital.type.includes('Public');
      case 'private':
        return hospital.type.includes('Private');
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Nearby Hospitals</h1>
            <Button variant="ghost" size="sm">
              <Filter className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-500 text-white p-4 mx-6 mt-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Emergency Services</h3>
            <p className="text-sm opacity-90">Immediate medical assistance</p>
          </div>
          <Button variant="secondary" size="sm" className="bg-white text-red-600">
            <Phone className="w-4 h-4 mr-2" />
            Call 911
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* View Toggle & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex bg-white rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg text-sm ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 rounded-lg text-sm ${
                viewMode === 'map' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              Map
            </button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl p-4 h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Map integration will be implemented</p>
              <p className="text-sm text-gray-500">Showing nearby hospitals</p>
            </div>
          </div>
        )}

        {/* Hospital List */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredHospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                      {hospital.isOpen24h && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          24/7
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{hospital.type}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hospital.distance}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {hospital.rating}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">{hospital.address}</p>
                  <p className="text-sm text-primary font-medium">{hospital.phone}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsScreen;
