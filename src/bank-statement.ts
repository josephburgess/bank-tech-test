import { BankAccount } from './types';

export class BankStatement {
  account: BankAccount;

  constructor(account: BankAccount) {
    this.account = account;
  }

  getStatement(): string {
    const header = this.getHeader();
    const statementLines = this.getStatementLines();
    return [header, ...statementLines.reverse()].join('\n');
  }

  private getHeader(): string {
    return 'Date || Credit || Debit || Balance';
  }

  getStatementLines(): string[] {
    let runningBalance = 0;
    return this.account.transactions.map(({ date, amount, type }) => {
      const dateString = date.toISOString().substring(0, 10);
      const [credit, debit] =
        type === 'deposit' ? [amount.toFixed(2), ''] : ['', amount.toFixed(2)];
      runningBalance =
        type === 'deposit' ? runningBalance + amount : runningBalance - amount;
      return `${dateString} || ${credit} || ${debit} || ${runningBalance.toFixed(
        2
      )}`;
    });
  }
}
