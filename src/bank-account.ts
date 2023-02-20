import { Transaction } from './transaction';

export class BankAccount {
  private balance: number = 0;
  private transactions: Transaction[] = [];

  deposit(amount: number, date: Date = new Date()): void {
    this.balance += amount;
    this.transactions.push(new Transaction(amount, date, 'deposit'));
  }

  withdraw(amount: number, date: Date = new Date()): void {
    if (this.balance < amount) {
      throw new Error('Insufficient balance');
    } else {
      this.balance -= amount;
      this.transactions.push(new Transaction(amount, date, 'withdrawal'));
    }
  }

  getStatement(): string {
    return 'Date || Credit || Debit || Balance';
  }
}
