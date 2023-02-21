import { BankSystem } from '../src/bank-system';

describe('Bank Account', () => {
  let bankSystem: BankSystem;

  beforeEach(() => {
    bankSystem = new BankSystem();
  });

  describe('deposits', () => {
    it('should take a deposit and update the bank account', () => {
      bankSystem.deposit(100);
      const expectedTrans = {
        amount: 100,
        date: new Date(),
        type: 'deposit',
      };
      expect(bankSystem['account'].balance).toEqual(100);
      expect(bankSystem['account'].transactions).toEqual([expectedTrans]);
    });
  });

  describe('withdrawals', () => {
    it('should allow a withdrawal and update the bank account', () => {
      bankSystem.deposit(100);
      bankSystem.withdraw(50);
      expect(bankSystem['account'].balance).toEqual(50);
    });

    it('should not allow a withdrawal if funds are insufficient', () => {
      expect(() => bankSystem.withdraw(100)).toThrowError(
        'Insufficient balance'
      );
    });
  });

  describe('getAccount', () => {
    it('should return a bankaccount object', () => {
      bankSystem.deposit(1000, new Date('2023-02-09'));
      bankSystem.withdraw(500, new Date('2023-02-10'));
      const account = bankSystem.getAccount();
      expect(account.balance).toEqual(500);
      expect(account.transactions).toHaveLength(2);
      expect(account.transactions[0].type).toEqual('deposit');
      expect(account.transactions[1].type).toEqual('withdrawal');
    });
  });
});
