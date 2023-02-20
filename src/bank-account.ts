import { Transaction } from './transaction';

export class BankAccount {
  private balance: number = 0;
  private transactions: Transaction[] = [];

  deposit(transaction: Transaction): void {}

  withdraw(transaction: Transaction): void {}

  getStatement() {}
}
