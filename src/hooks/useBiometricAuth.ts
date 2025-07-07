import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

interface BiometricAuthResult {
  success: boolean;
  error?: string;
}

export const useBiometricAuth = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkBiometricSupport();
    checkBiometricStatus();
  }, []);

  const checkBiometricSupport = async () => {
    if ('PublicKeyCredential' in window) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsSupported(available);
      } catch (error) {
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
  };

  const checkBiometricStatus = () => {
    const enabled = localStorage.getItem('biometric_enabled') === 'true';
    setIsEnabled(enabled);
  };

  const enrollBiometric = async (): Promise<BiometricAuthResult> => {
    if (!isSupported) {
      return { success: false, error: 'Biometric authentication not supported' };
    }

    setIsLoading(true);
    try {
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          rp: {
            name: "Haraka-Afya",
            id: window.location.hostname,
          },
          user: {
            id: crypto.getRandomValues(new Uint8Array(64)),
            name: "haraka-user",
            displayName: "Haraka-Afya User",
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" } // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            requireResidentKey: false
          },
          timeout: 60000,
          attestation: "none"
        }
      });

      if (credential) {
        // Store credential info (in production, store on server)
        localStorage.setItem('biometric_enabled', 'true');
        localStorage.setItem('biometric_credential_id', credential.id);
        
        setIsEnabled(true);
        
        toast({
          title: "Biometric authentication enabled",
          description: "You can now use biometric authentication to sign in.",
        });
        
        return { success: true };
      }
      
      return { success: false, error: 'Failed to create credential' };
    } catch (error: any) {
      console.error('Biometric enrollment error:', error);
      
      let errorMessage = 'Failed to enable biometric authentication';
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Biometric authentication was cancelled or denied';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Biometric authentication is not supported';
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithBiometric = async (): Promise<BiometricAuthResult> => {
    if (!isSupported || !isEnabled) {
      return { success: false, error: 'Biometric authentication not available' };
    }

    setIsLoading(true);
    try {
      const credentialId = localStorage.getItem('biometric_credential_id');
      if (!credentialId) {
        return { success: false, error: 'No biometric credential found' };
      }

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          allowCredentials: [{
            id: Uint8Array.from(credentialId, c => c.charCodeAt(0)),
            type: "public-key"
          }],
          userVerification: "required",
          timeout: 60000
        }
      });

      if (credential) {
        toast({
          title: "Authentication successful",
          description: "Biometric authentication completed successfully.",
        });
        return { success: true };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (error: any) {
      console.error('Biometric authentication error:', error);
      
      let errorMessage = 'Biometric authentication failed';
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Authentication was cancelled or denied';
      } else if (error.name === 'InvalidStateError') {
        errorMessage = 'Biometric sensor is not available';
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const disableBiometric = () => {
    localStorage.removeItem('biometric_enabled');
    localStorage.removeItem('biometric_credential_id');
    setIsEnabled(false);
    
    toast({
      title: "Biometric authentication disabled",
      description: "Biometric authentication has been turned off.",
    });
  };

  return {
    isSupported,
    isEnabled,
    isLoading,
    enrollBiometric,
    authenticateWithBiometric,
    disableBiometric
  };
};