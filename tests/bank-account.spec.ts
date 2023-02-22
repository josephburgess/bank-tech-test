import { BankAccount } from '../src/bank-account';

describe('Bank Account', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  describe('deposits', () => {
    it('should take a deposit and update the bank account', () => {
      expect(bankAccount['balance']).toEqual(0);
      expect(bankAccount['transactions']).toEqual([]);
      bankAccount.deposit(100);
      const expectedTrans = {
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
      expect(bankAccount['balance']).toEqual(0);
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

  describe('printStatement', () => {
    it('should call the statement printer with the account transactions and balance', () => {
      const mockStatementPrinter: {
        print: (
          transactions: {
            amount: number;
            date: Date;
            type: 'deposit' | 'withdrawal';
          }[],
          balance: number
        ) => void;
      } = {
        print: jest.fn(),
      };

      bankAccount.deposit(1000, new Date('2023-02-09'));
      bankAccount.withdraw(500, new Date('2023-02-10'));
      bankAccount.printStatement(mockStatementPrinter);

      const expectedTransactions = [
        { amount: 1000, date: new Date('2023-02-09'), type: 'deposit' },
        { amount: 500, date: new Date('2023-02-10'), type: 'withdrawal' },
      ];
      const expectedBalance = 500;

      expect(mockStatementPrinter.print).toHaveBeenCalledTimes(1);
      expect(mockStatementPrinter.print).toHaveBeenCalledWith(
        expectedTransactions,
        expectedBalance
      );
    });
  });
});
