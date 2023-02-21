import { BankStatement } from '../src/bank-statement';

describe('BankStatement', () => {
  let bankStatement: BankStatement;
  let bankAccount;

  beforeEach(() => {
    bankAccount = {
      balance: 500,
      transactions: [
        { amount: 1000, date: new Date('2023-02-09'), type: 'deposit' },
        { amount: 1000, date: new Date('2023-02-10'), type: 'withdrawal' },
        { amount: 500, date: new Date('2023-02-20'), type: 'deposit' },
      ],
    };
    bankStatement = new BankStatement(bankAccount);
  });

  it('should generate an empty statement when no transactions have been made', () => {
    bankAccount.transactions = [];
    expect(bankStatement.getStatement()).toEqual(
      'Date        ||Credit      ||Debit       ||Balance     '
    );
  });

  it('should generate a statement with a single deposit transaction', () => {
    bankAccount.transactions = [
      { amount: 500, date: new Date('2023-02-09'), type: 'deposit' },
    ];
    bankStatement = new BankStatement(bankAccount);
    expect(bankStatement.getStatement()).toContain(
      '2023-02-09  ||500.00      ||            ||500.00      '
    );
  });

  it('should generate a statement with a single withdrawal transaction', () => {
    bankAccount.transactions = [
      { amount: 500, date: new Date('2023-02-09'), type: 'withdrawal' },
    ];
    bankStatement = new BankStatement(bankAccount);
    expect(bankStatement.getStatement()).toContain(
      '2023-02-09  ||            ||500.00      ||-500.00     '
    );
  });

  it('should generate a statement with transactions in reverse chronological order', () => {
    bankStatement = new BankStatement(bankAccount);
    expect(bankStatement.getStatement()).toEqual(
      'Date        ||Credit      ||Debit       ||Balance     \n2023-02-20  ||500.00      ||            ||500.00      \n2023-02-10  ||            ||1000.00     ||0.00        \n2023-02-09  ||1000.00     ||            ||1000.00     '
    );
  });
});
