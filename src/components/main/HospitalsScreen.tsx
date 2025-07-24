import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Clock, Users, Stethoscope, Search, Filter, ChevronRight, Shield, Zap, Award, Heart, UserCheck, Calendar, Map, List } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
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
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');

  const categories = ['All', 'General', 'Maternity', 'Dental', 'Eye Care', 'ENT', 'Pediatric'];

  const facilities = [
    {
      id: '1',
      name: 'Kenyatta National Hospital',
      category: 'General',
      location: 'Nairobi',
      distance: '2.5 km',
      rating: 4.5,
      reviews: 1250,
      isEmergency: true,
      isInsurance: true,
      waitTime: '15 min',
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
      distance: '3.1 km',
      rating: 4.7,
      reviews: 890,
      isEmergency: true,
      isInsurance: true,
      waitTime: '10 min',
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
      distance: '1.8 km',
      rating: 4.6,
      reviews: 2100,
      isEmergency: true,
      isInsurance: true,
      waitTime: '20 min',
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
      distance: '4.2 km',
      rating: 4.4,
      reviews: 780,
      isEmergency: true,
      isInsurance: false,
      waitTime: '25 min',
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
      distance: '3.7 km',
      rating: 4.2,
      reviews: 650,
      isEmergency: true,
      isInsurance: true,
      waitTime: '30 min',
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
      reviews: 156,
      availability: 'Available Today 2:00 PM - 6:00 PM',
      experience: '15 years',
      price: 'KSh 3,500',
      conditions: ['Lung Cancer', 'Breast Cancer', 'Prostate Cancer']
    },
    {
      id: '2',
      name: 'Dr. James Mwangi',
      specialty: 'Cardiologist',
      hospital: 'Nairobi Hospital',
      rating: 4.9,
      reviews: 203,
      availability: 'Available Tomorrow 9:00 AM - 1:00 PM',
      experience: '12 years',
      price: 'KSh 4,000',
      conditions: ['Heart Disease', 'Hypertension', 'Arrhythmia']
    },
    {
      id: '3',
      name: 'Dr. Grace Kiprotich',
      specialty: 'Pulmonologist',
      hospital: 'Aga Khan Hospital',
      rating: 4.7,
      reviews: 98,
      availability: 'Available Today 3:00 PM - 5:00 PM',
      experience: '10 years',
      price: 'KSh 3,200',
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Modern Header */}
      <div className="bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')} className="hover:bg-muted/50">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">Healthcare Facilities</h1>
              <p className="text-sm text-muted-foreground">Find quality care near you</p>
            </div>
            <div className="w-10"></div>
          </div>
          
          {/* Sleek Tab Navigation */}
          <div className="flex bg-muted/50 rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'list'
                  ? 'bg-card text-primary shadow-lg shadow-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
              List View
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-card text-primary shadow-lg shadow-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Map className="w-4 h-4" />
              Map View
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {activeTab === 'map' ? (
          <div className="animate-fade-in">
            <HospitalMap />
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Enhanced Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search hospitals, clinics, doctors..." 
                  className="pl-12 pr-12 h-12 bg-card/50 border-border/50 rounded-2xl text-base focus:bg-card transition-colors"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-border/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Emergency Card */}
            <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-destructive animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-destructive">Emergency Services</h3>
                    <p className="text-muted-foreground">24/7 immediate medical assistance</p>
                  </div>
                  <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-6">
                    Call 911
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Specialist Doctors */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Top Specialists</h2>
                  <p className="text-muted-foreground">Book appointments with verified doctors</p>
                </div>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50 border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-8 h-8 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-foreground truncate">{doctor.name}</h3>
                              <p className="text-primary font-medium">{doctor.specialty}</p>
                              <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center space-x-1 mb-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="font-bold text-foreground">{doctor.rating}</span>
                                <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                              </div>
                              <p className="text-sm font-medium text-primary">{doctor.price}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm text-emerald-600 font-medium">{doctor.availability}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {doctor.conditions.slice(0, 3).map((condition, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                                  {condition}
                                </Badge>
                              ))}
                              {doctor.conditions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{doctor.conditions.length - 3} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex space-x-2 pt-2">
                              <Button 
                                className="flex-1 bg-primary hover:bg-primary/90 rounded-xl"
                                onClick={() => handleBookDoctor(doctor)}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Now
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="px-4 rounded-xl border-border/50 hover:bg-muted/50"
                                onClick={() => window.open(`tel:+254700000000`, '_self')}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Hospitals Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Nearby Hospitals</h2>
                  <p className="text-muted-foreground">Quality healthcare facilities in your area</p>
                </div>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid gap-4">
                {filteredFacilities.map((facility) => (
                  <Card 
                    key={facility.id} 
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-card to-card/50 border-border/50"
                    onClick={() => handleFacilitySelect(facility)}
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex-shrink-0 flex items-center justify-center">
                          <Shield className="w-8 h-8 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors truncate">
                                {facility.name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground text-sm">{facility.location}</span>
                                <span className="text-primary text-sm font-medium">• {facility.distance}</span>
                              </div>
                            </div>
                            
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="font-bold text-foreground">{facility.rating}</span>
                                <span className="text-sm text-muted-foreground">({facility.reviews})</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            {facility.isEmergency && (
                              <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                                <Zap className="w-3 h-3 mr-1" />
                                Emergency
                              </Badge>
                            )}
                            {facility.isInsurance && (
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                <Shield className="w-3 h-3 mr-1" />
                                Insurance
                              </Badge>
                            )}
                            <Badge variant="outline" className="border-border/50">
                              <Clock className="w-3 h-3 mr-1" />
                              {facility.waitTime} wait
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>24/7 Available</span>
                            </div>
                            <div className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors">
                              <span className="font-medium">View Details</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
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