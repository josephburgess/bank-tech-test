import { BankAccount } from '../src/bank-account';
import { Transaction } from '../src/transaction';

describe('Bank Account', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });
  describe('deposits', () => {
    it('should take a deposit and update the bank account', () => {
      bankAccount.deposit(100);
      const expectedTrans: Transaction = {
        amount: 100,
        date: new Date(),
        type: 'deposit',
      };
      expect(bankAccount['balance']).toEqual(100);
      expect(bankAccount['transactions']).toEqual([expectedTrans]);
    });
  });

  describe('withdrawals', () => {
    it('should allow a withdrawal and update the bank account', () => {
      bankAccount.deposit(100);
      bankAccount.withdraw(50);
      expect(bankAccount['balance']).toEqual(50);
    });

    it('should not allow a withdrawal if funds are insufficient', () => {
      expect(() => bankAccount.withdraw(100)).toThrowError(
        'Insufficient balance'
      );
    });
  });

  describe('getStatement', () => {
    it('should generate an empty statement when no transactions have been made', () => {
      expect(bankAccount.getStatement()).toEqual(
        'Date || Credit || Debit || Balance'
      );
    });

    it('should generate a statement with transactions in reverse chronological order', () => {
      bankAccount.deposit(1000, new Date('2023-02-09'));
      expect(bankAccount.getStatement()).toEqual(
        'Date || Credit || Debit || Balance\n2023-02-09 || 1000.00 ||  || 1000.00'
      );
    });

    it('should generate a statement with transactions in reverse chronological order', () => {
      bankAccount.deposit(1000, new Date('2023-02-09'));
      bankAccount.withdraw(1000, new Date('2023-02-10'));
      bankAccount.deposit(500, new Date('2023-02-20'));
      expect(bankAccount.getStatement()).toEqual(
        'Date || Credit || Debit || Balance\n2023-02-20 || 500.00 ||  || 500.00\n2023-02-10 ||  || 1000.00 || 0.00\n2023-02-09 || 1000.00 ||  || 1000.00'
      );
    });
  });
});
