import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import './global.css';
import './i18n';

import { AuthProvider } from 'context/AuthContex';
import { SendMoneyByPhoneProvider } from 'context/sendMoney';
import { UseRegisterProvider } from 'context/UseRegister';
import RootNavigator from 'navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <UseRegisterProvider>
          <SendMoneyByPhoneProvider>
            <RootNavigator theme={theme} />
          </SendMoneyByPhoneProvider>
        </UseRegisterProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
