import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import Overview from '../screens/overview';

const AppStack = createStackNavigator({
  screens: {
    Overview: {
      screen: Overview,
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
