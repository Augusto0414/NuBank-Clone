import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
const insets  = useSafeAreaInsets(); 
const {t} = useTranslation(); 
  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Text>{t('login')}</Text>
    </View>
  )
}

export default Login
