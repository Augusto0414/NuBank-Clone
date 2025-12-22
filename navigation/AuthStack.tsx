import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/auth/Login';
import PasswordView from 'screens/auth/PasswordView';
import RegisterDetailsView from 'screens/auth/RegisterDetailsView';
import RegisterPin from 'screens/auth/RegisterPin';
import RegisterProfileView from 'screens/auth/RegisterProfileView';

const AuthStack = createStackNavigator({
  initialRouteName: 'RegisterPin',
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    RegisterDetailsView: {
      screen: RegisterDetailsView,
      options: {
        headerShown: false,
      },
    },
    RegisterProfileView: {
      screen: RegisterProfileView,
      options: { headerShown: false },
    },
    RegisterPin: {
      screen: RegisterPin,
      options: { headerShown: false },
    },
    PasswordView: {
      screen: PasswordView,
      options: {
        headerShown: false,
        gestureDirection: 'vertical',
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
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
          };
        },
      },
    },
  },
});

export default AuthStack;
