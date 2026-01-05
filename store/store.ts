import { Transaction } from 'interfaces/wallet';
import { getTransactionHistory } from 'service/wallet/wallet.service';
import { create } from 'zustand';
type Status = 'idle' | 'completed' | 'failed';

interface transactionData {
  status: Status;
  transaction: Transaction[];
  errorMessage?: string;
  getTransactionHistory: () => Promise<void>;
}

export const useTransactionStore = create<transactionData>((set) => ({
  status: 'idle',
  transaction: [],
  errorMessage: '',
  getTransactionHistory: async () => {
    try {
      console.log('Transaction History: fetch start');
      set({ status: 'idle', errorMessage: '' });

      const { error, message, data = [] } = await getTransactionHistory();
      console.log('Transaction History:', data ?? 'no data');

      if (error) {
        set({ status: 'failed', errorMessage: message || 'An error occurred' });
        return;
      }

      set({ status: 'completed', transaction: data });
    } catch (error) {
      set({
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
  },
}));
