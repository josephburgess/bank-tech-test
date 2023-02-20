import { BankAccount } from '../src/bank-account';
import { Transaction } from '../src/transaction';

describe('Bank Account', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

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
