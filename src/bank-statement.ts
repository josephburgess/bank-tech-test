import { BankAccount } from './types';

export class BankStatement {
  account: BankAccount;

  constructor(account: BankAccount) {
    this.account = account;
  }

  getStatement(): string {
    const header = this.formatLine('Date', 'Credit', 'Debit', 'Balance');
    const statementLines = this.getStatementLines();
    return [header, ...statementLines.reverse()].join('\n');
  }

  printStatement(): void {
    console.log(this.getStatement());
  }

  private getStatementLines(): string[] {
    let runningBalance = 0;
    return this.account.transactions.map(({ date, amount, type }) => {
      const dateString = date.toISOString().substring(0, 10);
      const [credit, debit] =
        type === 'deposit' ? [amount.toFixed(2), ''] : ['', amount.toFixed(2)];
      runningBalance =
        type === 'deposit' ? runningBalance + amount : runningBalance - amount;
      return this.formatLine(
        dateString,
        credit,
        debit,
        runningBalance.toFixed(2)
      );
    });
  }

  private formatLine(...args: string[]): string {
    const [date, credit, debit, balance] = args.map((arg) => arg.padEnd(12));
    return `${date}||${credit}||${debit}||${balance}`;
  }
}
