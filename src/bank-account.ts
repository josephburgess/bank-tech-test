import { Transaction } from './types';
import { IStatementPrinter } from './bank-statement';

export class BankAccount {
  private balance = 0;
  private transactions: Transaction[] = [];

  deposit(amount: number, date: Date = new Date()): void {
    const transaction: Transaction = { amount, date, type: 'deposit' };
    this.balance += amount;
    this.transactions.push(transaction);
  }

  withdraw(amount: number, date: Date = new Date()): void {
    if (this.balance < amount) {
      throw new Error('Insufficient balance');
    }
    const transaction: Transaction = { amount, date, type: 'withdrawal' };
    this.balance -= amount;
    this.transactions.push(transaction);
  }

  printStatement(statementPrinter: IStatementPrinter): void {
    statementPrinter.print(this.transactions, this.balance);
  }
}
