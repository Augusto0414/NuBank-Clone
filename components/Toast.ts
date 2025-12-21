import { Alert, Platform, ToastAndroid } from 'react-native';

export const showToast = ({ title, message }: { title: string; message: string }) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, message);
  }
};
