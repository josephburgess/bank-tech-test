import { BankStatement } from '../src/bank-statement';
import { BankSystem } from '../src/bank-system';
import { Transaction, BankAccount } from '../src/types';

describe('BankSystem and BankStatement', () => {
  let bankSystem: BankSystem;
  let bankStatement: BankStatement;
  let account: BankAccount;
  let transactions: Transaction[];

  beforeEach(() => {
    bankSystem = new BankSystem();
    bankStatement = new BankStatement(bankSystem.getAccount());
    account = bankSystem.getAccount();
    transactions = account.transactions;
  });

  describe('deposit', () => {
    it('should increase the account balance and add a deposit transaction', () => {
      bankSystem.deposit(100);
      expect(account.balance).toBe(100);
      expect(transactions.length).toBe(1);
      expect(transactions[0].type).toBe('deposit');
      expect(transactions[0].amount).toBe(100);
    });

    it('should add a deposit transaction with the given date', () => {
      const date = new Date('2022-01-01');
      bankSystem.deposit(100, date);
      expect(transactions.length).toBe(1);
      expect(transactions[0].date).toBe(date);
    });
  });

  describe('withdraw', () => {
    it('should decrease the account balance and add a withdrawal transaction', () => {
      bankSystem.deposit(100);
      bankSystem.withdraw(50);
      expect(account.balance).toBe(50);
      expect(transactions.length).toBe(2);
      expect(transactions[1].type).toBe('withdrawal');
      expect(transactions[1].amount).toBe(50);
    });

    it('should throw an error if the withdrawal amount exceeds the account balance', () => {
      expect(() => bankSystem.withdraw(50)).toThrowError(
        'Insufficient balance'
      );
      expect(account.balance).toBe(0);
      expect(transactions.length).toBe(0);
    });

    it('should add a withdrawal transaction with the given date', () => {
      const date = new Date('2022-01-01');
      bankSystem.deposit(100);
      bankSystem.withdraw(50, date);
      expect(transactions.length).toBe(2);
      expect(transactions[1].date).toBe(date);
    });
  });

  describe('BankStatement', () => {
    it('should generate a statement with the correct balance for multiple transactions', () => {
      bankSystem.deposit(100, new Date('2023-01-01'));
      bankSystem.deposit(200, new Date('2023-02-01'));
      bankSystem.withdraw(50, new Date('2023-03-01'));
      bankSystem.deposit(50, new Date('2023-04-01'));

      const expectedStatement =
        'Date        ||Credit      ||Debit       ||Balance     \n' +
        '2023-04-01  ||50.00       ||            ||300.00      \n' +
        '2023-03-01  ||            ||50.00       ||250.00      \n' +
        '2023-02-01  ||200.00      ||            ||300.00      \n' +
        '2023-01-01  ||100.00      ||            ||100.00      ';
      expect(bankStatement.getStatement()).toBe(expectedStatement);
    });
  });
});
