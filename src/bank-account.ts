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
    let header = 'Date || Credit || Debit || Balance';
    let runningBalance = 0;
    const statementLines: string[] = [];
    for (const transaction of this.transactions) {
      const dateString = transaction.date.toISOString().substring(0, 10);
      let credit = '';
      let debit = '';
      if (transaction.type === 'deposit') {
        credit = transaction.amount.toFixed(2);
        runningBalance += transaction.amount;
      } else {
        debit = transaction.amount.toFixed(2);
        runningBalance -= transaction.amount;
      }
      const transactionString = `${dateString} || ${credit} || ${debit} || ${runningBalance.toFixed(
        2
      )}`;
      statementLines.push(transactionString);
    }
    const reversedStatementLines = [header, ...statementLines.reverse()];
    return reversedStatementLines.join('\n');
  }
}
