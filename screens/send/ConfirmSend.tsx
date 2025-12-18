import { formatMoney } from 'helpers/formarMonet';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepView } from './components/FormStepView';
import { SendMoneyContext } from './hooks/SendContext';

const ConfirmSend = () => {
  const { t } = useTranslation();
  const { amount, plateNumber, setReason } = useContext(SendMoneyContext);

  const handleSubmit = (reason: string) => {
    setReason(reason);
  };

  return (
    <FormStepView
      titlePrimary={t('confirm_amount', { amount: formatMoney(amount) })}
      subtitle={t('current_money', { amount: '$1,000.00' })}
      placeHolder="Ej: El almuerzo"
      buttonText={t('confirm_send_button')}
      textInput={t('what_is_reason')}
      userIcon={plateNumber}
      onSubmit={(value) => {
        console.log('Amount:', value);
        console.log('Amount:', amount);
      }}
    />
  );
};

export default ConfirmSend;
