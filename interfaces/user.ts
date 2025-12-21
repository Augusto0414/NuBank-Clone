export type userRegister = {
  name: string;
  lastName: string;
  email: string;
  passWord: string;
  phoneNumber: string;
  pin: string;
  numeroDocumento: string;
};

export type UseRegisterContextType = {
  userRegister: userRegister | null;
  createUser: (user: Partial<userRegister>) => void;
};
