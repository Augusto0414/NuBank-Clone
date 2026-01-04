import { Account } from 'interfaces/account';
import { supabase } from 'utils/supabase';

export const getAccountData = async (): Promise<{
  error: boolean;
  data?: Account;
  message?: string;
}> => {
  const { data, error } = await supabase
    .from('accounts')
    .select(
      `
    id,
    balance,
    profiles!inner (
      numero_documento,
      name,
      last_name,
      email,
      phone_number
    )
  `
    )
    .eq('profiles.auth_user_id', (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (error) {
    return { error: true, message: error.message };
  }

  return {
    error: false,
    data: data as unknown as Account,
  };
};
