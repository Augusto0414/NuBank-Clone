import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/home/Home';
import ConfirmSend from 'screens/send/ConfirmSend';
import PlateView from 'screens/send/PlateView';
import SendAmountView from 'screens/send/SendAmountView';
import SendView from 'screens/send/SendView';

const AppStack = createStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: { headerShown: false },
    },
    SendView: {
      screen: SendView,
      options: { headerShown: false },
    },
    PlateView: {
      screen: PlateView,
      options: { headerShown: false },
    },
    SendAmountView: {
      screen: SendAmountView,
      options: { headerShown: false },
    },
    ConfirmSend: {
      screen: ConfirmSend,
      options: { headerShown: false },
    },
  },
});

export default AppStack;
