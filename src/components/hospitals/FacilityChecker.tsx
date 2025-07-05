
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Wrench, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

interface Equipment {
  name: string;
  status: 'functional' | 'broken' | 'maintenance';
  repairDays?: number;
}

interface Doctor {
  name: string;
  specialty: string;
  availability: Array<{
    day: string;
    time: string;
  }>;
}

interface Hospital {
  id: string;
  name: string;
  distance: string;
  equipment: Equipment[];
  doctors: Doctor[];
}

interface FacilityCheckerProps {
  onBack: () => void;
}

const FacilityChecker: React.FC<FacilityCheckerProps> = ({ onBack }) => {
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [searchEquipment, setSearchEquipment] = useState('');

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'Kenyatta University Teaching Hospital',
      distance: '2.3 km',
      equipment: [
        { name: 'MRI Machine', status: 'functional' },
        { name: 'CT Scanner', status: 'maintenance', repairDays: 3 },
        { name: 'X-Ray Machine', status: 'functional' },
        { name: 'Ultrasound', status: 'broken', repairDays: 7 },
        { name: 'ECG Machine', status: 'functional' }
      ],
      doctors: [
        {
          name: 'Dr. Sarah Kimani',
          specialty: 'Oncologist',
          availability: [
            { day: 'Monday', time: '9:00 AM - 1:00 PM' },
            { day: 'Wednesday', time: '2:00 PM - 6:00 PM' }
          ]
        },
        {
          name: 'Dr. James Mwangi',
          specialty: 'Cardiologist',
          availability: [
            { day: 'Tuesday', time: '8:00 AM - 12:00 PM' },
            { day: 'Thursday', time: '1:00 PM - 5:00 PM' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Nairobi Hospital',
      distance: '5.1 km',
      equipment: [
        { name: 'MRI Machine', status: 'functional' },
        { name: 'CT Scanner', status: 'functional' },
        { name: 'X-Ray Machine', status: 'functional' },
        { name: 'Ultrasound', status: 'functional' },
        { name: 'ECG Machine', status: 'maintenance', repairDays: 2 }
      ],
      doctors: [
        {
          name: 'Dr. Mary Wanjiku',
          specialty: 'Pulmonologist',
          availability: [
            { day: 'Monday', time: '10:00 AM - 2:00 PM' },
            { day: 'Friday', time: '9:00 AM - 1:00 PM' }
          ]
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'functional': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'broken': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'maintenance': return <Wrench className="w-5 h-5 text-yellow-600" />;
      default: return null;
    }
  };

  const getAlternativeHospitals = (equipmentName: string, excludeHospitalId: string) => {
    return hospitals.filter(hospital => 
      hospital.id !== excludeHospitalId &&
      hospital.equipment.some(eq => eq.name === equipmentName && eq.status === 'functional')
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Facility Checker</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Search Equipment */}
        <div className="bg-white rounded-2xl p-4">
          <input
            type="text"
            placeholder="Search equipment (e.g., MRI, CT Scanner)"
            value={searchEquipment}
            onChange={(e) => setSearchEquipment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Hospitals List */}
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hospital.distance}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>

            {/* Equipment Status */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Equipment Status</h4>
              <div className="space-y-2">
                {hospital.equipment
                  .filter(eq => !searchEquipment || eq.name.toLowerCase().includes(searchEquipment.toLowerCase()))
                  .map((equipment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(equipment.status)}
                      <span className="font-medium">{equipment.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        equipment.status === 'functional' ? 'text-green-600' :
                        equipment.status === 'broken' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {equipment.status === 'functional' ? 'Functional' :
                         equipment.status === 'broken' ? 'Broken' : 'Under Maintenance'}
                      </span>
                      {equipment.repairDays && (
                        <p className="text-xs text-gray-500">
                          Repair: {equipment.repairDays} days
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Alternative Hospitals */}
              {hospital.equipment.some(eq => eq.status !== 'functional' && 
                (!searchEquipment || eq.name.toLowerCase().includes(searchEquipment.toLowerCase()))) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  <h5 className="font-medium text-blue-900 mb-2">Alternative Hospitals</h5>
                  {hospital.equipment
                    .filter(eq => eq.status !== 'functional' && 
                      (!searchEquipment || eq.name.toLowerCase().includes(searchEquipment.toLowerCase())))
                    .map((equipment, index) => {
                      const alternatives = getAlternativeHospitals(equipment.name, hospital.id);
                      return alternatives.length > 0 ? (
                        <div key={index} className="mb-2">
                          <p className="text-sm text-blue-800">
                            For {equipment.name}: {alternatives.map(alt => alt.name).join(', ')}
                          </p>
                        </div>
                      ) : null;
                    })}
                </div>
              )}
            </div>

            {/* Available Doctors */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Available Specialists</h4>
              <div className="space-y-3">
                {hospital.doctors.map((doctor, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{doctor.name}</h5>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                      </div>
                      <Button size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {doctor.availability.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {slot.day}: {slot.time}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityChecker;
