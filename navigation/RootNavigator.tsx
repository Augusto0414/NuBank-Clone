import { Theme } from '@react-navigation/native';
import { useAuth } from 'hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

type RootNavigatorProps = {
  theme: Theme;
};

const RootNavigator = ({ theme }: RootNavigatorProps) => {
  const { session, loading } = useAuth();

  if (loading !== 'succeeded') {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  return session ? <AppStack theme={theme} /> : <AuthStack theme={theme} />;
};

export default RootNavigator;
