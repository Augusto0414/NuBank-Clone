import { supabase } from 'utils/supabase';

export type DuplicateCheckResult = {
  hasDuplicate: boolean;
  duplicateEmail?: boolean;
  duplicatePhone?: boolean;
  duplicateDocument?: boolean;
};

export const checkDuplicateProfile = async ({
  email,
  phoneNumber,
  numeroDocumento,
}: {
  email: string;
  phoneNumber: string;
  numeroDocumento: string;
}): Promise<{ message: string; data: DuplicateCheckResult; error: boolean }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('email, phone_number, numero_documento')
      .or(
        `email.eq.${email},phone_number.eq.${phoneNumber},numero_documento.eq.${numeroDocumento}`
      );

    if (error) {
      return { message: error.message, data: { hasDuplicate: false }, error: true };
    }

    return {
      message: 'OK',
      data: {
        hasDuplicate: data.length > 0,
        duplicateEmail: data.some((r) => r.email === email),
        duplicatePhone: data.some((r) => r.phone_number === phoneNumber),
        duplicateDocument: data.some((r) => r.numero_documento === numeroDocumento),
      },
      error: false,
    };
  } catch (error: any) {
    return { message: error.message, data: { hasDuplicate: false }, error: true };
  }
};

export const supabaseAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ message: string; user: any; error: boolean; errorCode?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      const isDuplicateError =
        error.message?.toLowerCase().includes('already registered') ||
        error.message?.toLowerCase().includes('user already exists') ||
        error.message?.toLowerCase().includes('duplicate') ||
        error.status === 422;

      return {
        message: error.message,
        user: null,
        error: true,
        errorCode: isDuplicateError ? 'DUPLICATE_ACCOUNT' : 'AUTH_ERROR',
      };
    }

    return { message: 'User registered successfully', user: data.user, error: false };
  } catch (error: any | Error) {
    return { message: error.message, user: null, error: true };
  }
};

export const completeSignUp = async ({
  authUserId,
  numeroDocumento,
  name,
  lastName,
  email,
  phoneNumber,
  pin,
}: {
  authUserId?: string;
  numeroDocumento: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pin: string;
}): Promise<{ error: boolean; message?: string }> => {
  const { error } = await supabase.rpc('complete_signup', {
    p_auth_user_id: authUserId,
    p_numero_documento: numeroDocumento,
    p_name: name,
    p_last_name: lastName,
    p_email: email,
    p_phone: phoneNumber,
    p_pin_hash: pin,
  });
  if (error) {
    return { error: true, message: error.message };
  }
  return { error: false };
};
