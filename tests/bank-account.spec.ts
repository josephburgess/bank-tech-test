import { BankAccount } from '../src/bank-account';

describe('Bank Account', () => {
  let bankAccount;
  beforeEach(() => {
    bankAccount = new BankAccount();
  });
  it('should take a deposit and update the bank account', () => {
    const transaction = {
      date: '2023-02-20T13:56:27.458Z',
      amount: 100,
      type: 'deposit',
    };
    bankAccount.deposit(transaction);
    expect(bankAccount.balance).toEqual(100);
    expect(bankAccount.transactions).toEqual([transaction]);
  });
});
