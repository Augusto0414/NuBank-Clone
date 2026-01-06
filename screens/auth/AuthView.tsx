import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import * as SecureStore from 'expo-secure-store';
import { useLocalAuth } from 'hooks/useLocalAuth';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SigInService } from '../../service/auth/login.service';

const LOGO = require('../../assets/img/LOGO.png');

const { BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR, DARK_BUTON_LOGIN } = COLORS;
const sigInService = new SigInService();

const AuthView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const route = useNavigation();
  const { authenticate, isAuthenticating, checkSupport } = useLocalAuth();
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);

  const checkBiometricSupport = useCallback(async () => {
    const supported = await checkSupport();
    setIsBiometricSupported(supported);
  }, [checkSupport]);

  useEffect(() => {
    checkBiometricSupport();
  }, [checkBiometricSupport]);

  const handleBiometricLogin = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('user_email');
      const userPassword = await SecureStore.getItemAsync('user_password');

      if (!userEmail || !userPassword) {
        route.navigate('PasswordView' as never);
        return;
      }

      const success = await authenticate(t('biometric_auth_message'));

      if (!success) {
        route.navigate('PasswordView' as never);
        return;
      }

      const { user } = await sigInService.sigIn(userEmail, userPassword);

      if (!user) {
        throw new Error('Login failed');
      }

      console.log('Biometric authentication and Supabase login successful for:', userEmail);
    } catch (error) {
      console.error('Biometric or Supabase login error:', error);
    }
  };

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
        },
        styles.container,
      ]}>
      <Image source={LOGO} style={styles.logo} />

      <Text style={styles.infoDescriptionText}>{t('welcome_security')}</Text>

      <View style={styles.buttomContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isAuthenticating || !isBiometricSupported}
          onPress={handleBiometricLogin}>
          {isAuthenticating ? (
            <View
              style={[
                styles.buttomLogin,
                { backgroundColor: DARK_BUTON_LOGIN, paddingVertical: 15 },
              ]}>
              <ActivityIndicator color="#000" />
            </View>
          ) : (
            <Text style={[styles.buttomLogin, !isBiometricSupported && { opacity: 0.5 }]}>
              {t('login_button')}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            route.navigate('PasswordView' as never);
          }}>
          <Text style={styles.buttomPassword}>{t('password_button')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    position: 'relative',
    top: 90,
    left: -30,
  },

  infoDescriptionText: {
    color: DARK_BUTON_TEXT_COLOR,
    textAlign: 'justify',
    fontSize: 18,
    marginBottom: 40,
  },

  buttomContainer: {
    width: '100%',
    gap: 25,
    marginTop: 'auto',
    marginBottom: 30,
  },

  buttomLogin: {
    width: '100%',
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: DARK_BUTON_LOGIN,
    paddingVertical: 15,
    color: 'transparent',
  },

  buttomPassword: {
    width: '100%',
    textAlign: 'center',
    color: DARK_BUTON_TEXT_COLOR,
    paddingVertical: 10,
  },
});

export default AuthView;
