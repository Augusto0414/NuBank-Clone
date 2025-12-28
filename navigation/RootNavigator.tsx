import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

type RootNavigatorProps = {
  theme: Theme;
};

const RootNavigator = ({ theme }: RootNavigatorProps) => {
  const [hasLogin, setHasLogin] = useState<boolean | null>(null);

  const haveLogin = async (): Promise<boolean> => {
    const login = await AsyncStorage.getItem('user_email');
    if (!login) return false;
    return true;
  };

  useEffect(() => {
    haveLogin().then(setHasLogin);
  }, []);

  if (hasLogin === null) return null;

  return hasLogin ? <AppStack theme={theme} /> : <AuthStack theme={theme} />;
};

export default RootNavigator;
