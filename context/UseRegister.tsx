import { UseRegisterContextType, userRegister } from 'interfaces/user';
import { createContext, useState } from 'react';

const initialValues: userRegister = {
  name: '',
  lastName: '',
  email: '',
  passWord: '',
  phoneNumber: '',
  pin: '',
  numeroDocumento: '',
};

export const useRegisterContext = createContext<UseRegisterContextType | null>(null);

export const UseRegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRegister, setUserRegister] = useState<userRegister>(initialValues);

  const createUser = (user: Partial<userRegister>) => {
    setUserRegister((prevUser) => ({
      ...prevUser,
      ...user,
    }));
  };

  return (
    <useRegisterContext.Provider value={{ userRegister, createUser }}>
      {children}
    </useRegisterContext.Provider>
  );
};
