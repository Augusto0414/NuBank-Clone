import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import AuthView from 'screens/auth/AuthView';
import Login from 'screens/auth/Login';
import RegisterDetailsView from 'screens/auth/RegisterDetailsView';
import RegisterPin from 'screens/auth/RegisterPin';
import RegisterProfileView from 'screens/auth/RegisterProfileView';
import WelcomeView from 'screens/welcome/WelcomeView';
import PasswordView from '../screens/auth/PasswordView';

type AuthStackProps = {
  theme: Theme;
};

const Stack = createStackNavigator();

const AuthStack = ({ theme }: AuthStackProps) => {
  const [hasEmail, setHasEmail] = useState<boolean | null>(null);

  const checkEmail = async () => {
    const email = await AsyncStorage.getItem('user_email');
    setHasEmail(!!email);
  };

  useEffect(() => {
    checkEmail();
  }, []);

  if (hasEmail === null) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={hasEmail ? 'AuthView' : 'Welcome'}>
        <Stack.Screen name="Welcome" component={WelcomeView} options={{ headerShown: false }} />

        <Stack.Screen name="AuthView" component={AuthView} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        <Stack.Screen
          name="RegisterDetailsView"
          component={RegisterDetailsView}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegisterProfileView"
          component={RegisterProfileView}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="RegisterPin" component={RegisterPin} options={{ headerShown: false }} />

        <Stack.Screen
          name="PasswordView"
          component={PasswordView}
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
