import { Transaction } from './transaction';
import { BankAccount } from './bank-account';

export class BankSystem {
  private account: BankAccount = { balance: 0, transactions: [] };

  deposit(amount: number, date: Date = new Date()): void {
    this.account.balance += amount;
    this.account.transactions.push(new Transaction(amount, date, 'deposit'));
  }

  withdraw(amount: number, date: Date = new Date()): void {
    if (this.account.balance < amount) {
      throw new Error('Insufficient balance');
    } else {
      this.account.balance -= amount;
      this.account.transactions.push(
        new Transaction(amount, date, 'withdrawal')
      );
    }
  }

  getAccount(): BankAccount {
    return this.account;
  }
}
