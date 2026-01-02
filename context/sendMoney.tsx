import { createContext, ReactNode, useState } from 'react';
import { sendMoneyByPhone } from '../service/wallet/wallet.service';

type Loading = 'idle' | 'loading' | 'succeeded' | 'failed';

interface SendMoneyByPhoneContextType {
  loading: Loading;
  message: string;
  amount: number;
  plateNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setAmount: (amount: number) => void;
  setReason?: (reason: string) => void;
  sendMoneyByPhone: () => Promise<void>;
}

export const SendMoneyByPhoneContext = createContext<SendMoneyByPhoneContextType | null>(null);

export const SendMoneyByPhoneProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<Loading>('idle');
  const [message, setMessage] = useState<Error | any>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>('');

  const sendMoneyByPhoneHandler = async () => {
    try {
      setLoading('loading');
      setMessage('');

      if (!phoneNumber || amount <= 0) {
        setMessage('Número de teléfono o monto inválido');
      }

      const { error, message } = await sendMoneyByPhone({ phoneNumber, amount });

      if (error) {
        setLoading('failed');
        setMessage(message);
        console.log('Error sending money:', message);
        return;
      }

      setLoading('succeeded');
      setMessage('Transferencia realizada con éxito');
    } catch (error: any) {
      setLoading('failed');
      console.log(error.message);
      setMessage(error?.message ?? 'Error inesperado');
    }
  };

  return (
    <SendMoneyByPhoneContext.Provider
      value={{
        loading,
        message,
        amount,
        plateNumber: phoneNumber,
        setAmount,
        setReason,
        setPhoneNumber,
        sendMoneyByPhone: sendMoneyByPhoneHandler,
      }}>
      {children}
    </SendMoneyByPhoneContext.Provider>
  );
};
