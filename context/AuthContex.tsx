import { Session, User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';
import { supabase } from 'utils/supabase';

type Loading = 'idle' | 'loading' | 'succeeded' | 'failed';
interface AuthStackProps {
  user: User | null;
  loading: Loading;
  session: Session | null;
}

export const AuthContext = createContext<AuthStackProps>({
  user: null,
  loading: 'idle',
  session: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Loading>('idle');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading('succeeded');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading('succeeded');
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session, user, loading }}>{children}</AuthContext.Provider>;
};
