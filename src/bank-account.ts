import { Transaction } from './transaction';

export class BankAccount {
  private balance: number = 0;
  private transactions: Transaction[] = [];

  deposit(transaction: Transaction): void {
    this.balance += transaction.amount;
    this.transactions.push(transaction);
  }

  withdraw(transaction: Transaction): void {
    if (this.balance < transaction.amount) {
      throw new Error('Insufficient balance');
    } else {
      this.balance -= transaction.amount;
      this.transactions.push(transaction);
    }
  }

  getStatement() {}
}
