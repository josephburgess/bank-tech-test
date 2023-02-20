import { BankAccount } from '../src/bank-account';

describe('Bank Account', () => {
  let bankAccount;
  beforeEach(() => {
    bankAccount = new BankAccount();
  });
  it('should take a deposit and update the bank account', () => {
    const deposit = {
      date: '2023-02-20T13:56:27.458Z',
      amount: 100,
      type: 'deposit',
    };
    bankAccount.deposit(deposit);
    expect(bankAccount.balance).toEqual(100);
    expect(bankAccount.transactions).toEqual([deposit]);
  });

  it('should allow a withdrawal and update the bank account', () => {
    const deposit = {
      date: '2023-02-20T13:56:27.458Z',
      amount: 100,
      type: 'deposit',
    };
    const withdrawal = {
      date: '2023-02-20T13:58:27.458Z',
      amount: 50,
      type: 'withdrawal',
    };
    bankAccount.deposit(deposit);
    bankAccount.withdraw(withdrawal);
    expect(bankAccount.balance).toEqual(50);
    expect(bankAccount.transactions).toEqual([deposit, withdrawal]);
  });
});
