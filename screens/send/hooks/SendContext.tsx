import { createContext, ReactNode, useState } from 'react';

type SendMoneyContextProps = {
  plateNumber: string;
  amount: number;
  reason: string;
  setPlateNumber: (plate: string) => void;
  setAmount: (amount: number) => void;
  setReason: (reason: string) => void; //optional
};

export const SendMoneyContext = createContext<SendMoneyContextProps>({} as SendMoneyContextProps);

type Props = {
  children: ReactNode;
};

export const SendMoneyProvider = ({ children }: Props) => {
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>('');

  return (
    <SendMoneyContext.Provider
      value={{
        plateNumber,
        amount,
        reason,
        setPlateNumber,
        setAmount,
        setReason,
      }}>
      {children}
    </SendMoneyContext.Provider>
  );
};
