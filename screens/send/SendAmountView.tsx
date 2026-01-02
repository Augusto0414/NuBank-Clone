import { useNavigation } from '@react-navigation/native';
import { useSendMoneyByPhone } from 'hooks/useSendMoneyByPhone';
import { useTranslation } from 'react-i18next';
import { FormStepView } from './components/FormStepView';

const SendAmountView = () => {
  const { t } = useTranslation();
  const route = useNavigation();
  const { setAmount } = useSendMoneyByPhone();
  const handleAmount = (amount: string) => {
    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue)) {
      setAmount(numericValue);
      route.navigate('ConfirmSend' as never);
    }
  };
  return (
    <FormStepView
      titlePrimary={t('send_amount')}
      subtitle={t('current_money', { amount: '$1,000.00' })}
      keyboardType="numeric"
      skipButton
      onSubmit={(amount: string) => handleAmount(amount)}
    />
  );
};

export default SendAmountView;
