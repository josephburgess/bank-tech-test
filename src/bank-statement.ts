import { BankSystem } from './bank-system';
import { BankAccount } from './bank-account';
export class BankStatement {
  account: BankAccount;

  constructor(account: BankAccount) {
    this.account = account;
  }

  getStatement(): string {
    let header = 'Date || Credit || Debit || Balance';
    let runningBalance = 0;
    const statementLines: string[] = [];
    for (const transaction of this.account.transactions) {
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
