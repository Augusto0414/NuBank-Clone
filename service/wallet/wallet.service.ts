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
