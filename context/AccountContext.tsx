import { Account } from 'interfaces/account';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { getAccountData } from 'service/account/getAccountData';

interface AccountContextType {
  account: Account | null;
  fetchAccount: () => Promise<void>;
  loading: boolean;
}

export const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAccount = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await getAccountData();

    if (!error && data) {
      setAccount(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <AccountContext.Provider value={{ account, fetchAccount, loading }}>
      {children}
    </AccountContext.Provider>
  );
};
