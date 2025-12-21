import { useRegisterContext } from 'context/UseRegister';
import { UseRegisterContextType } from 'interfaces/user';
import { useContext } from 'react';

export const useRegister = (): UseRegisterContextType => {
  const registerUserContext = useContext(useRegisterContext);
  if (!registerUserContext) {
    throw new Error('useRegister must be used within a UseRegisterProvider');
  }
  return registerUserContext;
};
