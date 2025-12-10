import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string  =>  {
  const value = process?.env?.[key];  
  if(!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value as string;
} 

const EXPO_PUBLIC_SUPABASE_URL: string = getEnv("EXPO_PUBLIC_SUPABASE_URL");
const EXPO_PUBLIC_SUPABASE_ANON_KEY : string = getEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY"); 

export const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
