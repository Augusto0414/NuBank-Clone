import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepView } from './components/FormStepView';
import { SendMoneyContext } from './hooks/SendContext';

const PlateView = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setPlateNumber } = useContext(SendMoneyContext);

  const handleSubmit = (value: string) => {
    setPlateNumber(value);
    navigation.navigate('SendAmountView' as never);
  };
  return (
    <FormStepView
      titlePrimary={t('send_new')}
      titleSecondary={t('Placa Nu')}
      subtitle={t('digit_nu_plate')}
      maxLength={5}
      errorText={t('invalid_nu_plate')}
      skipButton
      onSubmit={(value) => handleSubmit(value)}
    />
  );
};

export default PlateView;
