import { Transaction } from './types';
import { IStatementPrinter } from './bank-statement';

export class BankAccount {
  private transactions: Transaction[] = [];

  deposit(amount: number, date: Date = new Date()): void {
    const transaction: Transaction = { amount, date, type: 'deposit' };
    this.transactions.push(transaction);
  }

  withdraw(amount: number, date: Date = new Date()): void {
    if (!this.hasSufficientBalance(amount)) {
      throw new Error('Insufficient balance');
    }
    const transaction: Transaction = { amount, date, type: 'withdrawal' };
    this.transactions.push(transaction);
  }

  private calculateBalance(): number {
    return this.transactions.reduce((balance, transaction) => {
      return transaction.type === 'deposit'
        ? balance + transaction.amount
        : balance - transaction.amount;
    }, 0);
  }

  private hasSufficientBalance(amount: number): boolean {
    return this.calculateBalance() >= amount;
  }

  printStatement(statementPrinter: IStatementPrinter): void {
    const balance = this.calculateBalance();
    statementPrinter.print(this.transactions, balance);
  }
}
