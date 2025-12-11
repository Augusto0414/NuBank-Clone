import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const PasswordView = () => {
  const {t} = useTranslation();
  return (
    <View>
        <Text>{t('password_title')}</Text>
    </View>
  )
}

export default PasswordView
