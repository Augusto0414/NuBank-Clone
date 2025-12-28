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

    const duplicateEmail = !!data?.find((r) => r.email === email);
    const duplicatePhone = !!data?.find((r) => r.phone_number === phoneNumber);
    const duplicateDocument = !!data?.find((r) => r.numero_documento === numeroDocumento);

    return {
      message: 'OK',
      data: {
        hasDuplicate: duplicateEmail || duplicatePhone || duplicateDocument,
        duplicateEmail,
        duplicatePhone,
        duplicateDocument,
      },
      error: false,
    };
  } catch (error: any | Error) {
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

export const createAccount = async ({
  userID,
  pin,
}: {
  userID: string;
  pin: string;
}): Promise<{ message: string; account: any; error: boolean }> => {
  try {
    const { error, data } = await supabase.from('accounts').insert({
      user_id: userID,
      pin_hash: pin,
      balance: 0,
    });
    if (error) {
      return { message: error.message, account: null, error: true };
    }
    return { message: 'Profile created successfully', account: data, error: false };
  } catch (error: any | Error) {
    return { message: error.message, account: null, error: true };
  }
};

export const createProfile = async ({
  userID,
  name,
  lastName,
  phoneNumber,
  email,
  numeroDocumento,
}: {
  userID: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  numeroDocumento: string;
}): Promise<{ message: string; profile: any; error: boolean }> => {
  try {
    const { data, error } = await supabase.from('profiles').insert({
      id: userID,
      name: name,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      numero_documento: numeroDocumento,
    });
    if (error) {
      return { message: error.message, profile: null, error: true };
    }
    return { message: 'Profile created successfully', profile: data, error: false };
  } catch (error: Error | any) {
    return { message: error.message, profile: null, error: true };
  }
};
