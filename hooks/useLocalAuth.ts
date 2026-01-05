import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';

interface UseLocalAuthReturn {
  authenticate: (promptMessage?: string) => Promise<boolean>;
  isAuthenticating: boolean;
  isSupported: boolean;
  checkSupport: () => Promise<boolean>;
  getSupportedAuthTypes: () => Promise<number[]>;
}

export const useLocalAuth = (): UseLocalAuthReturn => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  const checkSupport = async (): Promise<boolean> => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const supported = compatible && enrolled;
      setIsSupported(supported);
      return supported;
    } catch (error) {
      console.error('Error checking biometric support:', error);
      setIsSupported(false);
      return false;
    }
  };

  const getSupportedAuthTypes = async (): Promise<number[]> => {
    try {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      return types;
    } catch (error) {
      console.error('Error getting supported auth types:', error);
      return [];
    }
  };

  const authenticate = async (
    promptMessage: string = 'Authenticate to access your account'
  ): Promise<boolean> => {
    try {
      setIsAuthenticating(true);

      // Verificar soporte antes de autenticar
      const supported = await checkSupport();
      if (!supported) {
        console.log('Biometric authentication not supported or not enrolled');
        setIsAuthenticating(false);
        return false;
      }

      // Intentar autenticar
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
        cancelLabel: 'Cancel',
      });

      setIsAuthenticating(false);
      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      setIsAuthenticating(false);
      return false;
    }
  };

  return {
    authenticate,
    isAuthenticating,
    isSupported,
    checkSupport,
    getSupportedAuthTypes,
  };
};
