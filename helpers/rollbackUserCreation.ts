import { supabase } from 'utils/supabase';

export const rollbackUserCreation = async (authUserId: string, numeroDocumento: string) => {
  await supabase.from('profiles').delete().eq('numero_documento', numeroDocumento);
  await supabase.auth.admin.deleteUser(authUserId);
};
