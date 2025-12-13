import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/home/Home';
import { BackButton } from '../components/BackButton';
import Details from '../screens/details';

const AppStack = createStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: Home,
      options: { headerShown: false },
    },
    Details: {
      screen: Details,
      options: ({ navigation }) => ({
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    },
  },
});


export default AppStack;
