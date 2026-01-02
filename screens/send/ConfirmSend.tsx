import { useNavigation } from '@react-navigation/native';
import { formatMoney } from 'helpers/formarMonet';
import { useSendMoneyByPhone } from 'hooks/useSendMoneyByPhone';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepView } from './components/FormStepView';

const ConfirmSend = () => {
  const { t } = useTranslation();
  const { setReason, amount, plateNumber, loading, sendMoneyByPhone } = useSendMoneyByPhone();
  const navigate = useNavigation();
  const handleSubmit = async (reason: string) => {
    setReason?.(reason || '');
    await sendMoneyByPhone();
  };

  return (
    <FormStepView
      titlePrimary={t('confirm_amount', { amount: formatMoney(amount) })}
      subtitle={t('current_money', { amount: '$1,000.00' })}
      placeHolder="Ej: El almuerzo"
      buttonText={t('confirm_send_button')}
      textInput={t('what_is_reason')}
      userIcon={plateNumber}
      loading={loading === 'loading'}
      onSubmit={(value) => {
        console.log('press');
        handleSubmit(value);
        if (loading === 'succeeded') {
          navigate.navigate('Home' as never);
        }
      }}
    />
  );
};

export default ConfirmSend;
