import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LOGO = require('../../assets/img/LOGO.png');

const { BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR, DARK_BUTON_LOGIN } = COLORS;
const Login = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const route = useNavigation();

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
          onPress={async () => {
            console.log('remove Existing account');
            await AsyncStorage.removeItem('user_email');
          }}>
          <Text style={styles.buttomLogin}>{t('login_button')}</Text>
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

export default Login;
