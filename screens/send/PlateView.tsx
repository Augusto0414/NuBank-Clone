import { useNavigation } from '@react-navigation/native';
import { useSendMoneyByPhone } from 'hooks/useSendMoneyByPhone';
import { useTranslation } from 'react-i18next';
import { FormStepView } from './components/FormStepView';

const PlateView = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setPhoneNumber } = useSendMoneyByPhone();

  const handleSubmit = (value: string) => {
    setPhoneNumber(value);
    navigation.navigate('SendAmountView' as never);
  };
  return (
    <FormStepView
      titlePrimary={t('send_new')}
      titleSecondary={t('Placa Nu')}
      subtitle={t('digit_nu_plate')}
      maxLength={10}
      errorText={t('invalid_nu_plate')}
      skipButton
      onSubmit={(value) => handleSubmit(value)}
    />
  );
};

export default PlateView;
