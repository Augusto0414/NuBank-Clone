import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from 'screens/home/Home';
import ConfirmSend from 'screens/send/ConfirmSend';
import PlateView from 'screens/send/PlateView';
import SendAmountView from 'screens/send/SendAmountView';
import SendView from 'screens/send/SendView';

type AppStackProps = {
  theme: Theme;
};

const Stack = createStackNavigator();

const AppStack = ({ theme }: AppStackProps) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen name="SendView" component={SendView} options={{ headerShown: false }} />
        <Stack.Screen name="PlateView" component={PlateView} options={{ headerShown: false }} />

        <Stack.Screen
          name="SendAmountView"
          component={SendAmountView}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="ConfirmSend" component={ConfirmSend} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
