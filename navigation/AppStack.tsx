import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/home/Home';
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
  },
});

export default AppStack;
