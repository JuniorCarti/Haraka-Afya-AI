import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Clock, Stethoscope, Search, Filter, ChevronRight, Shield, Award, Heart, Calendar, Bot, MessageCircle, X, Activity, Zap, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import FacilityChecker from '../hospitals/FacilityChecker';
import DoctorBookingModal from '../hospitals/DoctorBookingModal';

interface HospitalsScreenProps {
  onNavigate: (screen: string) => void;
}

const HospitalsScreen: React.FC<HospitalsScreenProps> = ({ onNavigate }) => {
  const [selectedCancerType, setSelectedCancerType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const cancerTypes = ['All', 'Breast Cancer', 'Prostate Cancer', 'Lung Cancer', 'Colorectal Cancer', 'Cervical Cancer', 'Leukemia'];

  const cancerFacilities = [
    {
      id: '1',
      name: 'Kenyatta National Hospital Cancer Center',
      location: 'Nairobi',
      distance: '2.5 km',
      rating: 4.8,
      reviews: 1250,
      description: 'Comprehensive cancer care specializing in all types of cancer with state-of-the-art treatment facilities.',
      cancerTypes: ['Breast Cancer', 'Lung Cancer', 'Prostate Cancer', 'Colorectal Cancer', 'Leukemia'],
      doctors: [
        { name: 'Dr. Sarah Wanjiku', specialty: 'Medical Oncologist', experience: '15 years' },
        { name: 'Dr. James Kimani', specialty: 'Radiation Oncologist', experience: '12 years' },
        { name: 'Dr. Grace Muthoni', specialty: 'Surgical Oncologist', experience: '18 years' }
      ],
      equipment: ['Linear Accelerator', 'CT Simulator', 'PET/CT Scanner', 'MRI Machine', 'Chemotherapy Suite', 'Brachytherapy Unit']
    },
    {
      id: '2',
      name: 'Aga Khan University Hospital Oncology Unit',
      location: 'Nairobi',
      distance: '3.1 km',
      rating: 4.9,
      reviews: 890,
      description: 'Advanced oncology unit offering personalized cancer treatment with international standard protocols.',
      cancerTypes: ['Breast Cancer', 'Prostate Cancer', 'Lung Cancer', 'Cervical Cancer'],
      doctors: [
        { name: 'Dr. Fatima Hassan', specialty: 'Medical Oncologist', experience: '14 years' },
        { name: 'Dr. Ahmed Ali', specialty: 'Hematologist-Oncologist', experience: '16 years' },
        { name: 'Dr. Priya Sharma', specialty: 'Gynecologic Oncologist', experience: '11 years' }
      ],
      equipment: ['TrueBeam STx', 'PET/CT Scanner', 'Da Vinci Surgical Robot', 'Mammography Unit', 'Bone Marrow Transplant Unit']
    },
    {
      id: '3',
      name: 'The Nairobi Hospital Cancer Treatment Centre',
      location: 'Nairobi',
      distance: '1.8 km',
      rating: 4.7,
      reviews: 2100,
      description: 'Leading private cancer center with multidisciplinary approach and latest treatment technologies.',
      cancerTypes: ['Breast Cancer', 'Prostate Cancer', 'Colorectal Cancer', 'Lung Cancer'],
      doctors: [
        { name: 'Dr. Michael Otieno', specialty: 'Radiation Oncologist', experience: '20 years' },
        { name: 'Dr. Catherine Njoroge', specialty: 'Medical Oncologist', experience: '13 years' },
        { name: 'Dr. David Kiprotich', specialty: 'Urologic Oncologist', experience: '17 years' }
      ],
      equipment: ['Elekta Versa HD', 'MRI Scanner', 'CT Scanner', 'Mammography', 'Nuclear Medicine Unit', 'Immunotherapy Center']
    },
    {
      id: '4',
      name: 'Mater Misericordiae Hospital Oncology Wing',
      location: 'Nairobi',
      distance: '4.2 km',
      rating: 4.6,
      reviews: 780,
      description: 'Specialized cancer care with focus on patient comfort and comprehensive support services.',
      cancerTypes: ['Breast Cancer', 'Cervical Cancer', 'Colorectal Cancer'],
      doctors: [
        { name: 'Dr. Mary Wambui', specialty: 'Gynecologic Oncologist', experience: '19 years' },
        { name: 'Dr. Peter Macharia', specialty: 'Medical Oncologist', experience: '10 years' }
      ],
      equipment: ['Linear Accelerator', 'CT Scanner', 'Ultrasound Machines', 'Chemotherapy Suites', 'Palliative Care Unit']
    },
    {
      id: '5',
      name: 'Texas Cancer Center - Nairobi',
      location: 'Nairobi',
      distance: '5.1 km',
      rating: 4.8,
      reviews: 650,
      description: 'International standard cancer center with cutting-edge technology and world-class specialists.',
      cancerTypes: ['Breast Cancer', 'Lung Cancer', 'Prostate Cancer', 'Leukemia', 'Colorectal Cancer'],
      doctors: [
        { name: 'Dr. Robert Johnson', specialty: 'Hematologist-Oncologist', experience: '22 years' },
        { name: 'Dr. Elizabeth Kamau', specialty: 'Radiation Oncologist', experience: '15 years' },
        { name: 'Dr. Simon Mutua', specialty: 'Surgical Oncologist', experience: '14 years' }
      ],
      equipment: ['CyberKnife', 'TrueBeam', 'PET/CT Scanner', 'MRI', 'Immunotherapy Lab', 'Genetic Testing Lab']
    }
  ];

  const filteredFacilities = selectedCancerType === 'All'
    ? cancerFacilities.filter(facility => 
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cancerFacilities.filter(facility => 
        facility.cancerTypes.includes(selectedCancerType) && 
        (facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         facility.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFacilitySelect = (facility: any) => {
    setSelectedFacility(facility);
  };

  const handleBookDoctor = (doctor: any, facility: any) => {
    setSelectedDoctor({ ...doctor, facility: facility.name });
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
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')} className="hover:bg-muted/50">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Browse Cancer Facilities Near You</h1>
              <p className="text-sm text-muted-foreground">Comprehensive cancer care and treatment centers</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search cancer facilities, doctors, treatments..." 
              className="pl-12 pr-12 h-12 bg-card/50 border-border/50 rounded-2xl text-base focus:bg-card transition-colors"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Cancer Type Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Filter by Cancer Type</h3>
            <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
              {cancerTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedCancerType(type)}
                  className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 ${
                    selectedCancerType === type
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-border/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-primary">AI Cancer Assistant</h3>
                <p className="text-muted-foreground">Not sure about your cancer type? Get personalized guidance and information</p>
              </div>
              <Dialog open={showAiAssistant} onOpenChange={setShowAiAssistant}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      AI Cancer Assistant
                    </DialogTitle>
                    <DialogDescription>
                      I can help you understand different cancer types and find appropriate facilities.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Common questions I can help with:</p>
                      <ul className="text-sm space-y-1">
                        <li>• What are the symptoms of different cancer types?</li>
                        <li>• Which screening tests do I need?</li>
                        <li>• What treatment options are available?</li>
                        <li>• How to prepare for cancer treatment?</li>
                      </ul>
                    </div>
                    <Button className="w-full" onClick={() => setShowAiAssistant(false)}>
                      Start Conversation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Cancer Facilities List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cancer Treatment Centers</h2>
              <p className="text-muted-foreground">{filteredFacilities.length} facilities found</p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredFacilities.map((facility) => (
              <Card 
                key={facility.id} 
                className="hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer bg-gradient-to-br from-card to-card/50 border-border/50"
                onClick={() => handleFacilitySelect(facility)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Facility Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-foreground hover:text-primary transition-colors mb-2">
                          {facility.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground text-sm">{facility.location}</span>
                          <span className="text-primary text-sm font-medium">• {facility.distance}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {facility.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="font-bold text-foreground">{facility.rating}</span>
                          <span className="text-sm text-muted-foreground">({facility.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Cancer Types */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Cancer Types Treated:</h4>
                      <div className="flex flex-wrap gap-2">
                        {facility.cancerTypes.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Specialist Doctors */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Specialist Doctors:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {facility.doctors.map((doctor, index) => (
                          <div key={index} className="bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm text-foreground">{doctor.name}</p>
                                <p className="text-xs text-primary">{doctor.specialty}</p>
                                <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-xs h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookDoctor(doctor, facility);
                                }}
                              >
                                Book
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Equipment & Technology */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Available Equipment & Technology:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {facility.equipment.map((equipment, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <Activity className="w-3 h-3 text-emerald-600" />
                            <span className="text-muted-foreground">{equipment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Certified
                        </Badge>
                        <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                          <Phone className="w-4 h-4" />
                          <span>24/7 Support</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors">
                        <span className="font-medium text-sm">View Full Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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