export interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  direction: 'IN' | 'OUT';
  counterparty: string;
}
