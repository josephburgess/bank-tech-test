import { Transaction } from './types';

export interface IStatementPrinter {
  print(transactions: Transaction[], balance: number): void;
}

export class BankStatement implements IStatementPrinter {
  print(transactions: Transaction[], balance: number): void {
    const header = this.formatLine('Date', 'Credit', 'Debit', 'Balance');
    const statementLines = this.getStatementLines(transactions, balance);
    console.log([header, ...statementLines.reverse()].join('\n'));
  }

  private getStatementLines(
    transactions: Transaction[],
    balance: number
  ): string[] {
    let runningBalance = 0;
    return transactions.map(({ date, amount, type }) => {
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
