import { supabase } from 'utils/supabase';

export const sendMoneyByPhone = async ({
  phoneNumber,
  amount,
}: {
  phoneNumber: string;
  amount: number;
}) => {
  const { error } = await supabase.rpc('transfer_money_by_phone', {
    receiver_phone: phoneNumber,
    amount,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false };
};
