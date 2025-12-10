import "./global.css";

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import RootNavigator from "navigation/RootNavigator";
import 'react-native-gesture-handler';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return <RootNavigator theme={theme} />
}
