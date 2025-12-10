import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/auth/Login';
import Register from 'screens/auth/Register';

const AuthStack = createStackNavigator({
    initialRouteName: "Login", 
    screens: {
        Login: {
            screen: Login, 
            options: {
                headerShown: false, 
            }
        }, 
        Register: {
            screen: Register, 
            optionns: {
                headerShown: false
            }
        }
    }
}); 

export default AuthStack