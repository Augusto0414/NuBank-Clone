import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/home/Home';

const AppStack = createStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: { headerShown: false },
    },
  },
});

export default AppStack;
