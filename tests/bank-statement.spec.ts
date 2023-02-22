import { BankStatement } from '../src/bank-statement';
import { Transaction } from '../src/types';

describe('BankStatement', () => {
  let bankStatement: BankStatement;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    bankStatement = new BankStatement();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a statement with a single deposit transaction', () => {
    const transactions: Transaction[] = [
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'deposit',
      },
    ];
    const expectedStatement =
      'Date        ||Credit      ||Debit       ||Balance     \n' +
      '2023-02-09  ||500.00      ||            ||500.00      ';
    bankStatement.print(transactions, 500);
    expect(console.log).toHaveBeenCalledWith(expectedStatement);
  });

  it('should generate a statement with a single deposit and single withdrawal transaction', () => {
    const transactions: Transaction[] = [
      {
        amount: 500,
        date: new Date('2023-02-08'),
        type: 'deposit',
      },
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'withdrawal',
      },
    ];
    const expectedStatement =
      'Date        ||Credit      ||Debit       ||Balance     \n' +
      '2023-02-09  ||            ||500.00      ||0.00        \n' +
      '2023-02-08  ||500.00      ||            ||500.00      ';
    bankStatement.print(transactions, 0);
    expect(console.log).toHaveBeenCalledWith(expectedStatement);
  });

  it('should generate a statement with transactions in reverse chronological order', () => {
    const transactions: Transaction[] = [
      {
        amount: 1000,
        date: new Date('2023-02-09'),
        type: 'deposit',
      },
      {
        amount: 1000,
        date: new Date('2023-02-10'),
        type: 'withdrawal',
      },
      {
        amount: 500,
        date: new Date('2023-02-20'),
        type: 'deposit',
      },
    ];
    const expectedStatement =
      'Date        ||Credit      ||Debit       ||Balance     \n' +
      '2023-02-20  ||500.00      ||            ||500.00      \n' +
      '2023-02-10  ||            ||1000.00     ||0.00        \n' +
      '2023-02-09  ||1000.00     ||            ||1000.00     ';
    bankStatement.print(transactions, 500);
    expect(console.log).toHaveBeenCalledWith(expectedStatement);
  });
});
