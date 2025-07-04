
import React, { useState } from 'react';
import { Menu, Bell, MapPin, Mic, Type, Phone, Heart, Activity, Thermometer, Pill, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface HomePageProps {
  userName: string;
  greeting: string;
  onNavigate: (screen: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ userName, greeting, onNavigate }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const quickActions = [
    { id: 'symptoms', icon: Activity, label: 'Check Symptoms', description: 'AI-powered health analysis' },
    { id: 'hospitals', icon: MapPin, label: 'Find Hospitals', description: 'Locate nearby healthcare' },
    { id: 'learn', icon: Heart, label: 'Health Tips', description: 'Daily wellness advice' },
    { id: 'emergency', icon: Phone, label: 'Emergency', description: 'Quick access to help', urgent: true }
  ];

  const healthStats = [
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500' },
    { label: 'Temperature', value: '36.5°C', icon: Thermometer, color: 'text-blue-500' },
    { label: 'Last Check', value: '2 days ago', icon: Activity, color: 'text-green-500' }
  ];

  const todaysTips = [
    "Stay hydrated - aim for 8 glasses of water daily",
    "Take a 10-minute walk after meals",
    "Practice deep breathing for 5 minutes"
  ];

  const handleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    // Voice input simulation
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('sidebar')}>
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-6 h-6" />
              </Button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{userName.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-gray-600">How can I help you stay healthy today?</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Emergency Services</h3>
              <p className="text-sm opacity-90">24/7 immediate assistance</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => onNavigate('emergency')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 911
            </Button>
          </div>
        </div>

        {/* Voice Input Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Hujambo! Tell me your symptoms
          </h2>
          <div className="flex space-x-3">
            <Button
              variant={isVoiceActive ? "default" : "outline"}
              className={`flex-1 py-4 ${isVoiceActive ? 'animate-pulse' : ''}`}
              onClick={handleVoiceInput}
            >
              <Mic className="w-5 h-5 mr-2" />
              {isVoiceActive ? 'Listening...' : 'Speak'}
            </Button>
            <Button variant="outline" className="flex-1 py-4" onClick={() => onNavigate('symptoms')}>
              <Type className="w-5 h-5 mr-2" />
              Type
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Available in Swahili, English & Sheng
          </p>
        </div>

        {/* Health Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Health Overview</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('profile')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {healthStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('-500', '-100')} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.id)}
                  className={`bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-all duration-200 ${
                    action.urgent ? 'ring-2 ring-red-200' : ''
                  }`}
                >
                  <div className={`w-12 h-12 ${action.urgent ? 'bg-red-100' : 'bg-primary/10'} rounded-xl flex items-center justify-center mb-3`}>
                    <IconComponent className={`w-6 h-6 ${action.urgent ? 'text-red-600' : 'text-primary'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Health Tips */}
        <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Health Tips</h2>
          <div className="space-y-3">
            {todaysTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm flex-1">{tip}</p>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onNavigate('learn')}
          >
            View More Tips
          </Button>
        </div>

        {/* Medication Reminder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Medication Reminder</h2>
            <Pill className="w-6 h-6 text-primary" />
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Vitamin D</h3>
                <p className="text-sm text-gray-600">Take with breakfast</p>
              </div>
              <Button size="sm" onClick={() => onNavigate('profile')}>
                Mark Taken
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-gold/20 to-primary/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Upgrade to Premium</h3>
              <p className="text-sm text-gray-600">Unlimited AI consultations & more</p>
            </div>
            <Button onClick={() => onNavigate('subscription')}>
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
