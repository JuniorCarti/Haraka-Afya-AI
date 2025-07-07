
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Clock, Users, Stethoscope, Search, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import FacilityChecker from '../hospitals/FacilityChecker';
import DoctorBookingModal from '../hospitals/DoctorBookingModal';
import HospitalMap from '../map/HospitalMap';

interface HospitalsScreenProps {
  onNavigate: (screen: string) => void;
}

const HospitalsScreen: React.FC<HospitalsScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('map');

  const categories = ['All', 'General', 'Maternity', 'Dental', 'Eye Care', 'ENT', 'Pediatric'];

  const facilities = [
    {
      id: '1',
      name: 'Kenyatta National Hospital',
      category: 'General',
      location: 'Nairobi',
      rating: 4.5,
      equipmentStatus: {
        xray: '✅ Functional',
        ctScan: '✅ Functional',
        mri: '✅ Functional',
        ventilator: '✅ Functional',
        ecg: '✅ Functional'
      }
    },
    {
      id: '2',
      name: 'Aga Khan University Hospital',
      category: 'General',
      location: 'Nairobi',
      rating: 4.7,
      equipmentStatus: {
        xray: '✅ Functional',
        ctScan: '✅ Functional',
        mri: '✅ Functional',
        ventilator: '✅ Functional',
        ecg: '✅ Functional'
      }
    },
    {
      id: '3',
      name: 'Nairobi Hospital',
      category: 'General',
      location: 'Nairobi',
      rating: 4.6,
      equipmentStatus: {
        xray: '✅ Functional',
        ctScan: '✅ Functional',
        mri: '✅ Functional',
        ventilator: '✅ Functional',
        ecg: '✅ Functional'
      }
    },
    {
      id: '4',
      name: 'Mater Misericordiae Hospital',
      category: 'General',
      location: 'Nairobi',
      rating: 4.4,
      equipmentStatus: {
        xray: '✅ Functional',
        ctScan: '✅ Functional',
        mri: '🔧 Maintenance (Est. Repair: 3 days)',
        ventilator: '✅ Functional',
        ecg: '✅ Functional'
      }
    },
    {
      id: '5',
      name: 'Pumwani Maternity Hospital',
      category: 'Maternity',
      location: 'Nairobi',
      rating: 4.2,
      equipmentStatus: {
        xray: '✅ Functional',
        ctScan: '❌ Broken (Alternative: Kenyatta Hospital)',
        mri: 'Not Available',
        ventilator: '✅ Functional',
        ecg: '✅ Functional'
      }
    }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Wanjiku',
      specialty: 'Oncologist (Cancer Specialist)',
      hospital: 'Kenyatta National Hospital',
      rating: 4.8,
      availability: 'Available Today 2:00 PM - 6:00 PM',
      experience: '15 years',
      conditions: ['Lung Cancer', 'Breast Cancer', 'Prostate Cancer']
    },
    {
      id: '2',
      name: 'Dr. James Mwangi',
      specialty: 'Cardiologist',
      hospital: 'Nairobi Hospital',
      rating: 4.9,
      availability: 'Available Tomorrow 9:00 AM - 1:00 PM',
      experience: '12 years',
      conditions: ['Heart Disease', 'Hypertension', 'Arrhythmia']
    },
    {
      id: '3',
      name: 'Dr. Grace Kiprotich',
      specialty: 'Pulmonologist',
      hospital: 'Aga Khan Hospital',
      rating: 4.7,
      availability: 'Available Today 3:00 PM - 5:00 PM',
      experience: '10 years',
      conditions: ['Lung Cancer', 'Asthma', 'COPD', 'Tuberculosis']
    }
  ];

  const filteredFacilities = selectedCategory === 'All'
    ? facilities.filter(facility => facility.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : facilities.filter(facility => 
        facility.category === selectedCategory && 
        facility.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFacilitySelect = (facility: any) => {
    setSelectedFacility(facility);
  };

  const handleBookDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  if (selectedFacility) {
    return (
      <FacilityChecker 
        onBack={() => setSelectedFacility(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Hospitals & Facilities</h1>
            <div></div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-xl p-1 mt-4">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'map'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Map View
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'list'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {activeTab === 'map' ? (
          <HospitalMap />
        ) : (
          <>
            {/* Search and Categories */}
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search hospitals, clinics..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              </div>

              <div className="flex overflow-x-auto space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Services */}
            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Emergency Services</h3>
                  <p className="text-sm text-gray-600">Need immediate assistance? Call 911</p>
                </div>
              </div>
            </div>

            {/* Specialist Doctors Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialist Doctors</h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex space-x-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">{doctor.hospital}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{doctor.experience}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center space-x-1 mb-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">{doctor.availability}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doctor.conditions.map((condition, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleBookDoctor(doctor)}
                      >
                        Book Session
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(`tel:+254700000000`, '_self')}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitals Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Nearby Hospitals</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {filteredFacilities.map((facility) => (
                  <div 
                    key={facility.id} 
                    className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleFacilitySelect(facility)}
                  >
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-primary transition-colors">
                            {facility.name}
                          </h3>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{facility.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs mb-3">{facility.location}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3" />
                            <span>Show on map</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>24/7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Doctor Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <DoctorBookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedDoctor(null);
          }}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default HospitalsScreen;
