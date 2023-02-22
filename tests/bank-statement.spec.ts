import { BankStatement } from '../src/bank-statement';
import { Transaction } from '../src/types';

describe('BankStatement', () => {
  let bankStatement: BankStatement;
  let transactions: jest.Mocked<Transaction[]>;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    bankStatement = new BankStatement();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a statement with a single deposit transaction', () => {
    transactions = [
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'deposit',
      } as jest.Mocked<Transaction>,
    ];
    const expectedStatement =
      'Date        ||Credit      ||Debit       ||Balance     \n' +
      '2023-02-09  ||500.00      ||            ||500.00      ';
    bankStatement.print(transactions, 500);
    expect(console.log).toHaveBeenCalledWith(expectedStatement);
  });

  it('should generate a statement with a single deposit and single withdrawal transaction', () => {
    transactions = [
      {
        amount: 500,
        date: new Date('2023-02-08'),
        type: 'deposit',
      } as jest.Mocked<Transaction>,
      {
        amount: 500,
        date: new Date('2023-02-09'),
        type: 'withdrawal',
      } as jest.Mocked<Transaction>,
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
      } as jest.Mocked<Transaction>,
      {
        amount: 1000,
        date: new Date('2023-02-10'),
        type: 'withdrawal',
      } as jest.Mocked<Transaction>,
      {
        amount: 500,
        date: new Date('2023-02-20'),
        type: 'deposit',
      } as jest.Mocked<Transaction>,
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
