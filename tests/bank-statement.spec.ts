import { BankStatement } from '../src/bank-statement';

export interface BankAccount {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  date: Date;
  type: 'deposit' | 'withdrawal';
}

describe('BankStatement', () => {
  let bankStatement: BankStatement;
  let bankAccount: BankAccount;

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
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'deposit',
      } as Transaction,
    ];
    bankStatement = new BankStatement(bankAccount);
    expect(bankStatement.getStatement()).toEqual(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-09  ||500.00      ||            ||500.00      '
    );
  });

  it('should generate a statement with a single deposit and single withdrawal transaction', () => {
    bankAccount.transactions = [
      {
        amount: 500,
        date: new Date('2023-02-08'),
        type: 'deposit',
      } as Transaction,
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'withdrawal',
      } as Transaction,
    ];
    bankStatement = new BankStatement(bankAccount);
    console.log(bankStatement.getStatement());
    expect(bankStatement.getStatement()).toEqual(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-09  ||            ||500.00      ||0.00        \n' +
        '2023-02-08  ||500.00      ||            ||500.00      '
    );
  });

  it('should generate a statement with transactions in reverse chronological order', () => {
    bankStatement = new BankStatement(bankAccount);
    expect(bankStatement.getStatement()).toEqual(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-20  ||500.00      ||            ||500.00      \n' +
        '2023-02-10  ||            ||1000.00     ||0.00        \n' +
        '2023-02-09  ||1000.00     ||            ||1000.00     '
    );
  });

  it('should print output to the console with printstatement', () => {
    const logSpy = jest.spyOn(console, 'log');
    bankStatement.printStatement();
    expect(logSpy).toHaveBeenCalledWith(bankStatement.getStatement());
  });
});
