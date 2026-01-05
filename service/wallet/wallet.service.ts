import { Transaction } from 'interfaces/wallet';
import { supabase } from 'utils/supabase';

export const sendMoneyByPhone = async ({
  phoneNumber,
  amount,
}: {
  phoneNumber: string;
  amount: number;
}): Promise<{ error: boolean; message?: string }> => {
  const { error } = await supabase.rpc('transfer_money_by_phone', {
    receiver_phone: phoneNumber,
    amount,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false };
};

export const getBalance = async (): Promise<{
  error: boolean;
  message?: string;
  balance?: any;
}> => {
  const { data, error } = await supabase.rpc('get_my_balance');

  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false, balance: data };
};

export const getTransactionHistory = async (): Promise<{
  error: boolean;
  data?: Transaction[];
  message?: string;
}> => {
  const { data, error } = await supabase.rpc('get_transaction_history');
  console.log('getTransactionHistory - data:', data);
  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false, data };
};
