export type Transaction = {
  amount: number;
  date: Date;
  type: 'deposit' | 'withdrawal';
};
