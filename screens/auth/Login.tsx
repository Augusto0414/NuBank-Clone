import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LOGO = require("../../assets/img/LOGO.png");

const Login = () => {
  const insets = useSafeAreaInsets(); 
  const { t } = useTranslation();

  return (
    <View
      style={[{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
        },
        styles.container,
      ]}
    >

      <Image source={LOGO} style={styles.logo} />

      <Text style={styles.infoDescriptionText}>
        {t('welcome_security')}
      </Text>

      <View style={styles.buttomContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Text style={styles.buttomLogin}>{t('login_button')}</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Text style={styles.buttomPassword}>{t('password_button')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8F23D6",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    position: "relative", 
    top: 90,
    left: -30,
  },

  infoDescriptionText: {
    color: "#FFFFFF",
    textAlign: "justify",
    fontSize: 18,
    marginBottom: 40,
  },

  buttomContainer: {
    width: "100%",
    gap: 25,
    marginTop: "auto",
    marginBottom: 30,
  },

  buttomLogin: {
    width: "100%",
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    color: "#000",
  },

  buttomPassword: {
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    paddingVertical: 10,
  },
});

export default Login;
