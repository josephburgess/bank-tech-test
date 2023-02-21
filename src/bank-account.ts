import { Transaction } from './transaction';

export type BankAccount = {
  balance: number;
  transactions: Transaction[];
};
