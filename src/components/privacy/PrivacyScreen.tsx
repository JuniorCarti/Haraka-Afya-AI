
import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Fingerprint, Smartphone, Mail, Bell, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    twoFactor: false,
    biometric: false,
    notifications: true,
    dataSharing: false,
    locationTracking: true,
    autoLock: true
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleBiometricSetup = () => {
    alert('Biometric authentication setup will be available in the next update. This feature requires device-specific implementation.');
  };

  const handleTwoFactorSetup = () => {
    alert('Two-factor authentication setup:\n\n1. Enter your phone number\n2. Verify with SMS code\n3. Setup backup codes\n\nThis feature will be fully implemented with backend integration.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Privacy & Security</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Security Overview */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Protected</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Encrypted</p>
            </div>
          </div>
        </div>

        {/* Authentication Settings */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add extra security with SMS verification</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={settings.twoFactor}
                  onCheckedChange={() => handleToggle('twoFactor')}
                />
                {settings.twoFactor && (
                  <Button size="sm" variant="outline" onClick={handleTwoFactorSetup}>
                    Setup
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Fingerprint className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Biometric Authentication</p>
                  <p className="text-sm text-gray-500">Use fingerprint or face ID</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={settings.biometric}
                  onCheckedChange={() => handleToggle('biometric')}
                />
                {settings.biometric && (
                  <Button size="sm" variant="outline" onClick={handleBiometricSetup}>
                    Setup
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Auto-Lock</p>
                  <p className="text-sm text-gray-500">Lock app when inactive</p>
                </div>
              </div>
              <Switch 
                checked={settings.autoLock}
                onCheckedChange={() => handleToggle('autoLock')}
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Data Sharing</p>
                  <p className="text-sm text-gray-500">Share anonymized health data for research</p>
                </div>
              </div>
              <Switch 
                checked={settings.dataSharing}
                onCheckedChange={() => handleToggle('dataSharing')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Location Tracking</p>
                  <p className="text-sm text-gray-500">Find nearby healthcare facilities</p>
                </div>
              </div>
              <Switch 
                checked={settings.locationTracking}
                onCheckedChange={() => handleToggle('locationTracking')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Medication reminders and health tips</p>
                </div>
              </div>
              <Switch 
                checked={settings.notifications}
                onCheckedChange={() => handleToggle('notifications')}
              />
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Need Help?</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Contact our support team for any privacy or security concerns.
          </p>
          <Button 
            className="w-full"
            onClick={() => window.location.href = 'mailto:support@harakahealthafya.org'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Support
          </Button>
        </div>

        {/* Legal Information */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal</h2>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Data Protection Notice
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
