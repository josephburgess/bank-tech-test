import { BankAccount, Transaction } from './types';

export class BankSystem {
  private account: BankAccount = { balance: 0, transactions: [] };

  deposit(amount: number, date: Date = new Date()): void {
    const transaction: Transaction = { amount, date, type: 'deposit' };
    this.account.balance += amount;
    this.account.transactions.push(transaction);
  }

  withdraw(amount: number, date: Date = new Date()): void {
    if (this.account.balance < amount) {
      throw new Error('Insufficient balance');
    }
    const transaction: Transaction = { amount, date, type: 'withdrawal' };
    this.account.balance -= amount;
    this.account.transactions.push(transaction);
  }

  getAccount(): BankAccount {
    return this.account;
  }
}
