import { Transaction } from './types';
import { IStatementPrinter } from './bank-statement';

export class BankAccount {
  private transactions: Transaction[] = [];

  deposit(amount: number, date: Date = new Date()): void {
    this.validatePositive(amount);
    this.addTransaction(amount, date, 'deposit');
  }

  withdraw(amount: number, date: Date = new Date()): void {
    this.validatePositive(amount);
    this.validateSufficientBalance(amount);
    this.addTransaction(amount, date, 'withdrawal');
  }

  printStatement(statementPrinter: IStatementPrinter): void {
    const balance = this.calculateBalance();
    statementPrinter.print(this.transactions, balance);
  }

  private calculateBalance(): number {
    return this.transactions.reduce((balance, transaction) => {
      return transaction.type === 'deposit'
        ? balance + transaction.amount
        : balance - transaction.amount;
    }, 0);
  }

  private validatePositive(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
  }

  private validateSufficientBalance(amount: number): void {
    if (this.calculateBalance() < amount) {
      throw new Error('Insufficient balance');
    }
  }

  private addTransaction(
    amount: number,
    date: Date,
    type: 'deposit' | 'withdrawal'
  ): void {
    this.transactions.push({ amount, date, type } as Transaction);
  }
}
