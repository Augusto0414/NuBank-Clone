import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { supabase } from 'utils/supabase';
export class SigInService {
  async sigIn(
    email: string,
    password: string
  ): Promise<{ user: User; session: Session; weakPassword?: WeakPassword | undefined }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async sigOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
}
