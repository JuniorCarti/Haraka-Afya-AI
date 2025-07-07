import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Smartphone, Clock, MapPin, LogOut, Key, Fingerprint } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SecuritySettingsScreenProps {
  onBack: () => void;
}

interface LoginSession {
  id: string;
  location: string;
  device: string;
  lastActive: string;
  current: boolean;
}

const SecuritySettingsScreen: React.FC<SecuritySettingsScreenProps> = ({ onBack }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrollingMFA, setEnrollingMFA] = useState(false);
  const [verifyingMFA, setVerifyingMFA] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const { toast } = useToast();

  const mockSessions: LoginSession[] = [
    {
      id: '1',
      location: 'Nairobi, Kenya',
      device: 'iPhone 14 Pro - Safari',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      location: 'Nairobi, Kenya',
      device: 'MacBook Pro - Chrome',
      lastActive: '1 day ago',
      current: false
    },
    {
      id: '3',
      location: 'Mombasa, Kenya',
      device: 'Samsung Galaxy - Chrome',
      lastActive: '3 days ago',
      current: false
    }
  ];

  useEffect(() => {
    checkMFAStatus();
    checkBiometricSupport();
  }, []);

  const checkMFAStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: factors } = await supabase.auth.mfa.listFactors();
        setTwoFactorEnabled(factors && factors.totp && factors.totp.length > 0);
      }
    } catch (error) {
      console.error('Error checking MFA status:', error);
    }
  };

  const checkBiometricSupport = async () => {
    if ('PublicKeyCredential' in window && 'authenticator' in PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setBiometricSupported(available);
        
        // Check if biometric is already enabled (stored in localStorage for demo)
        const biometricEnabled = localStorage.getItem('biometric_enabled') === 'true';
        setBiometricEnabled(biometricEnabled);
      } catch (error) {
        setBiometricSupported(false);
      }
    }
  };

  const handleEnableMFA = async () => {
    setEnrollingMFA(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Haraka-Afya 2FA'
      });

      if (error) {
        toast({
          title: "Error enabling 2FA",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setQrCode(data.totp.qr_code);
        toast({
          title: "2FA Setup",
          description: "Scan the QR code with your authenticator app, then enter the verification code.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEnrollingMFA(false);
    }
  };

  const handleVerifyMFA = async () => {
    setVerifyingMFA(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (factors.data?.totp && factors.data.totp.length > 0) {
        const factorId = factors.data.totp[0].id;
        
        const { error } = await supabase.auth.mfa.verify({
          factorId,
          challengeId: factorId, // In real implementation, this would be from the challenge
          code: verificationCode
        });

        if (error) {
          toast({
            title: "Verification failed",
            description: "Invalid verification code. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setTwoFactorEnabled(true);
        setQrCode('');
        setVerificationCode('');
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication has been successfully enabled.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify 2FA code.",
        variant: "destructive",
      });
    } finally {
      setVerifyingMFA(false);
    }
  };

  const handleDisableMFA = async () => {
    setLoading(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (factors.data?.totp && factors.data.totp.length > 0) {
        const factorId = factors.data.totp[0].id;
        
        const { error } = await supabase.auth.mfa.unenroll({ factorId });
        
        if (error) {
          toast({
            title: "Error disabling 2FA",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        setTwoFactorEnabled(false);
        toast({
          title: "2FA Disabled",
          description: "Two-factor authentication has been disabled.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disable 2FA.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnableBiometric = async () => {
    if (!biometricSupported) {
      toast({
        title: "Not supported",
        description: "Biometric authentication is not supported on this device.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Create credential for biometric authentication
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: "Haraka-Afya",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode("user-id"),
            name: "user@example.com",
            displayName: "Haraka-Afya User",
          },
          pubKeyCredParams: [{alg: -7, type: "public-key"}],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential) {
        localStorage.setItem('biometric_enabled', 'true');
        localStorage.setItem('biometric_credential', JSON.stringify({
          id: credential.id,
          type: credential.type
        }));
        
        setBiometricEnabled(true);
        toast({
          title: "Biometric enabled",
          description: "Biometric authentication has been successfully enabled.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable biometric authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableBiometric = () => {
    localStorage.removeItem('biometric_enabled');
    localStorage.removeItem('biometric_credential');
    setBiometricEnabled(false);
    toast({
      title: "Biometric disabled",
      description: "Biometric authentication has been disabled.",
    });
  };

  const handleLogoutAllDevices = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut({ scope: 'global' });
      toast({
        title: "Logged out",
        description: "You have been logged out from all devices.",
      });
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out from all devices.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={twoFactorEnabled ? handleDisableMFA : handleEnableMFA}
                disabled={loading || enrollingMFA}
                className={`w-12 h-6 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>

          {qrCode && (
            <div className="mt-4 space-y-4">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">QR Code placeholder</span>
                </div>
                <p className="text-sm text-gray-600">Scan with your authenticator app</p>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button 
                  onClick={handleVerifyMFA}
                  disabled={!verificationCode || verifyingMFA}
                  className="w-full"
                >
                  {verifyingMFA ? 'Verifying...' : 'Verify & Enable 2FA'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Biometric Authentication */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Biometric Login</h3>
                <p className="text-sm text-gray-600">
                  {biometricSupported ? 'Use fingerprint or face ID' : 'Not supported on this device'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${biometricEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {biometricEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={biometricEnabled ? handleDisableBiometric : handleEnableBiometric}
                disabled={!biometricSupported || loading}
                className={`w-12 h-6 rounded-full transition-colors ${
                  biometricEnabled ? 'bg-green-600' : 'bg-gray-300'
                } relative ${!biometricSupported ? 'opacity-50' : ''}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  biometricEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Active Sessions
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogoutAllDevices}
              disabled={loading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout All
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockSessions.map((session) => (
              <div key={session.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{session.device}</h4>
                      {session.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {session.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-4">Security Best Practices</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <p>Enable both 2FA and biometric authentication for maximum security</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <p>Regularly review your active sessions and log out unused devices</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <p>Never share your verification codes or biometric data</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <p>Log out when using shared or public devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsScreen;