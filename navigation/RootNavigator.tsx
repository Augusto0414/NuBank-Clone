import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

type RootNavigatorProps = {
  theme: Theme;
};

const RootNavigator = ({ theme }: RootNavigatorProps) => {
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  const haveAccount = async (): Promise<boolean> => {
    const account = await AsyncStorage.getItem('user_email');
    if (!account) return false;
    return true;
  };

  useEffect(() => {
    haveAccount().then(setHasAccount);
  }, []);

  if (hasAccount === null) return null;

  return hasAccount ? <AppStack theme={theme} /> : <AuthStack theme={theme} />;
};

export default RootNavigator;
