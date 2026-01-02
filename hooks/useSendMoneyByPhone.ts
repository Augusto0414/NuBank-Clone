import { SendMoneyByPhoneContext } from 'context/sendMoney';
import { useContext } from 'react';

export const useSendMoneyByPhone = () => {
  const context = useContext(SendMoneyByPhoneContext);
  if (!context) {
    throw new Error('useSendMoneyByPhone debe ser usado dentro de SendMoneyByPhoneProvider');
  }
  return context;
};
