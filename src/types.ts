export type BankAccount = {
  balance: number;
  transactions: Transaction[];
};

export type Transaction = {
  amount: number;
  date: Date;
  type: 'deposit' | 'withdrawal';
};
