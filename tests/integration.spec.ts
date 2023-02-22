import { BankAccount } from '../src/bank-account';
import { BankStatement } from '../src/bank-statement';

describe('BankAccount and BankStatement integration', () => {
  let account: BankAccount;
  let statement: BankStatement;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    account = new BankAccount();
    statement = new BankStatement();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should generate a statement with a single deposit transaction', () => {
    account.printStatement(statement);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Date        ||Credit      ||Debit       ||Balance     '
    );
    account.deposit(500, new Date('2023-02-09'));
    account.printStatement(statement);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-09  ||500.00      ||            ||500.00      '
    );
  });

  it('should generate a statement with a single deposit and single withdrawal transaction', () => {
    account.deposit(500, new Date('2023-02-08'));
    account.printStatement(statement);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-08  ||500.00      ||            ||500.00      '
    );
    account.withdraw(500, new Date('2023-02-09'));
    account.printStatement(statement);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-09  ||            ||500.00      ||0.00        \n' +
        '2023-02-08  ||500.00      ||            ||500.00      '
    );
  });

  it('should print a statement for multiple transactions', () => {
    account.deposit(1000, new Date('2023-02-01'));
    account.deposit(2000, new Date('2023-02-03'));
    account.withdraw(500, new Date('2023-02-04'));
    account.printStatement(statement);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-02-04  ||            ||500.00      ||2500.00     \n' +
        '2023-02-03  ||2000.00     ||            ||3000.00     \n' +
        '2023-02-01  ||1000.00     ||            ||1000.00     '
    );
  });
});
