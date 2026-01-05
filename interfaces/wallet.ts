export interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  type: 'IN' | 'OUT';
  counterparty: string;
}
