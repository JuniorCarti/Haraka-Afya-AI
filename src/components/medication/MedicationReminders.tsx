
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Pill, Calendar, Clock, Check, Bell } from 'lucide-react';
import { Button } from '../ui/button';

interface MedicationRemindersProps {
  onBack: () => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  taken: { [key: string]: boolean };
  color: string;
}

const MedicationReminders: React.FC<MedicationRemindersProps> = ({ onBack }) => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Daily',
      times: ['09:00'],
      taken: {},
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: '2',
      name: 'Blood Pressure Medication',
      dosage: '10mg',
      frequency: 'Twice Daily',
      times: ['08:00', '20:00'],
      taken: {},
      color: 'bg-blue-100 text-blue-800'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'Daily',
    times: ['09:00']
  });

  const getCurrentDateKey = () => {
    return new Date().toISOString().split('T')[0];
  };

  const markAsTaken = (medId: string, time: string) => {
    const dateKey = `${getCurrentDateKey()}-${time}`;
    setMedications(prev => 
      prev.map(med => 
        med.id === medId 
          ? { ...med, taken: { ...med.taken, [dateKey]: true } }
          : med
      )
    );

    // Schedule notification for next dose
    scheduleNotification(medId, time);
  };

  const scheduleNotification = (medId: string, time: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const med = medications.find(m => m.id === medId);
      if (med) {
        new Notification(`Time for ${med.name}`, {
          body: `Take ${med.dosage} now`,
          icon: '/favicon.ico'
        });
      }
    }
  };

  const isTaken = (medId: string, time: string) => {
    const dateKey = `${getCurrentDateKey()}-${time}`;
    const med = medications.find(m => m.id === medId);
    return med?.taken[dateKey] || false;
  };

  const addMedication = () => {
    const newMed: Medication = {
      id: Date.now().toString(),
      ...newMedication,
      taken: {},
      color: 'bg-green-100 text-green-800'
    };
    setMedications(prev => [...prev, newMed]);
    setNewMedication({ name: '', dosage: '', frequency: 'Daily', times: ['09:00'] });
    setShowAddForm(false);
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Medication Reminders</h1>
            <Button size="sm" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Schedule
          </h2>
          
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{med.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${med.color}`}>
                    {med.dosage}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {med.times.map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{time}</span>
                      <Button
                        size="sm"
                        variant={isTaken(med.id, time) ? "default" : "outline"}
                        onClick={() => markAsTaken(med.id, time)}
                        className={`h-8 ${isTaken(med.id, time) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      >
                        {isTaken(med.id, time) ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Taken
                          </>
                        ) : (
                          'Mark Taken'
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Medication Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Medication</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Medication name"
                value={newMedication.name}
                onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              
              <input
                type="text"
                placeholder="Dosage (e.g., 10mg, 1 tablet)"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              
              <select
                value={newMedication.frequency}
                onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Daily">Daily</option>
                <option value="Twice Daily">Twice Daily</option>
                <option value="Three Times Daily">Three Times Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
              
              <div className="flex space-x-3">
                <Button onClick={addMedication} className="flex-1">
                  Add Medication
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Calendar Integration</span>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationReminders;
