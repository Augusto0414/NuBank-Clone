import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/auth/Login';
import PasswordView from 'screens/auth/PasswordView';
import Register from 'screens/auth/Register';
import WelComeView from 'screens/auth/WelComeView';

const AuthStack = createStackNavigator({
  initialRouteName: 'WelComeView',
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      optionns: {
        headerShown: false,
      },
    },
    WelComeView: {
      screen: WelComeView,
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
