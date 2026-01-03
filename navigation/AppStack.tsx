import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from 'constants/Colors';

import i18n from 'i18n';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from 'screens/home/Home';
import ConfirmSend from 'screens/send/ConfirmSend';
import PlateView from 'screens/send/PlateView';
import SendAmountView from 'screens/send/SendAmountView';
import SendView from 'screens/send/SendView';
import DetailView from 'screens/userProfile/details/DetailView';

type AppStackProps = {
  theme: Theme;
};

const Stack = createStackNavigator();

const AppStack = ({ theme }: AppStackProps) => {
  const { LIGHT_GRAY } = COLORS;
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

        <Stack.Screen
          name="DetailView"
          component={DetailView}
          options={({ navigation }) => ({
            title: i18n.t('details_user'),
            headerStyle: {
              backgroundColor: LIGHT_GRAY,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 12 }}>
                <Ionicons name="chevron-back-outline" size={26} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="ConfirmSend" component={ConfirmSend} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
