import React, { useState } from 'react';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut, Edit, ChevronRight, Heart, Activity, Calendar, Pill } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ProfileEditForm from '../profile/ProfileEditForm';
import HealthStatsForm from '../profile/HealthStatsForm';

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userName, userEmail, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'settings'>('overview');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showHealthForm, setShowHealthForm] = useState(false);
  
  const [userData, setUserData] = useState({
    firstName: userName,
    lastName: '',
    email: userEmail,
    phone: '+254 712 345 678',
    age: '28',
    profilePicture: ''
  });

  const [healthStats, setHealthStats] = useState({
    height: '170',
    weight: '65',
    bloodPressure: '120/80',
    sugarLevel: '90',
    heartRate: '72',
    bloodType: 'O+'
  });

  const healthData = [
    { label: 'Height', value: `${healthStats.height} cm`, icon: Activity },
    { label: 'Weight', value: `${healthStats.weight} kg`, icon: Activity },
    { label: 'Blood Pressure', value: `${healthStats.bloodPressure} mmHg`, icon: Heart },
    { label: 'Blood Sugar', value: `${healthStats.sugarLevel} mg/dL`, icon: Activity },
    { label: 'Heart Rate', value: `${healthStats.heartRate} BPM`, icon: Heart },
    { label: 'Blood Type', value: healthStats.bloodType, icon: Heart }
  ];

  const medications = [
    { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily', nextDose: '8:00 AM' },
    { name: 'Omega-3', dosage: '500mg', frequency: 'Twice daily', nextDose: '2:00 PM' }
  ];

  const settingsItems = [
    { id: 'subscription', icon: CreditCard, label: 'Subscription Plans', description: 'Manage your plan' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Push notifications & alerts' },
    { id: 'privacy', icon: Shield, label: 'Privacy & Security', description: 'Data protection settings' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
  ];

  const handleSaveProfile = (newData: any) => {
    setUserData(newData);
    setShowEditForm(false);
  };

  const handleSaveHealthStats = (newStats: any) => {
    setHealthStats(newStats);
    setShowHealthForm(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowEditForm(true)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={userData.profilePicture || undefined} />
            <AvatarFallback className="bg-primary text-white text-2xl">
              {userData.firstName[0]}{userData.lastName?.[0] || ''}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.phone}</p>
            <div className="mt-2">
              <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium">
                Premium Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Health Statistics</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowHealthForm(true)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {healthData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Symptom check completed</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Pill className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Medication taken</p>
              <p className="text-sm text-gray-500">This morning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-6">
      {/* Medication Tracker */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Medications</h2>
          <Button variant="outline" size="sm">
            Add New
          </Button>
        </div>
        <div className="space-y-3">
          {medications.map((medication, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                <span className="text-sm text-gray-500">{medication.frequency}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{medication.dosage}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Next dose: {medication.nextDose}</span>
                <Button size="sm">Mark Taken</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Goals */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Goals</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Daily Water Intake</span>
              <span className="text-sm text-blue-600">6/8 glasses</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Exercise Minutes</span>
              <span className="text-sm text-green-600">25/30 min</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-2">
          {settingsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <button
          onClick={() => onNavigate('logout')}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium">Sign Out</h4>
            <p className="text-sm text-red-400">Log out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'health', label: 'Health' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-4">
            <h1 className="text-lg font-semibold text-gray-900 text-center">Profile</h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4">
          <div className="flex bg-white rounded-2xl p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'health' && renderHealth()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>

      {/* Edit Forms */}
      {showEditForm && (
        <ProfileEditForm
          userData={userData}
          onSave={handleSaveProfile}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {showHealthForm && (
        <HealthStatsForm
          currentStats={healthStats}
          onSave={handleSaveHealthStats}
          onCancel={() => setShowHealthForm(false)}
        />
      )}
    </>
  );
};

export default ProfileScreen;
