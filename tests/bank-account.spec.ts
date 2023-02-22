import { BankAccount } from '../src/bank-account';

describe('Bank Account', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  describe('deposits', () => {
    it('should take a deposit and add the transaction to the transactions', () => {
      expect(bankAccount['transactions']).toEqual([]);
      bankAccount.deposit(100);
      const expectedTrans = {
        amount: 100,
        date: new Date(),
        type: 'deposit',
      };
      expect(bankAccount['transactions']).toEqual([expectedTrans]);
    });
    it('should not allow a negative deposit', () => {
      expect(() => bankAccount.deposit(-100)).toThrowError(
        'Amount must be a positive number'
      );
    });
  });

  describe('withdrawals', () => {
    it('should allow a withdrawal and update the transactions', () => {
      bankAccount.deposit(100);
      bankAccount.withdraw(50);
      expect(bankAccount['transactions']).toEqual([
        { amount: 100, date: expect.any(Date), type: 'deposit' },
        { amount: 50, date: expect.any(Date), type: 'withdrawal' },
      ]);
    });

    it('should not allow a withdrawal if funds are insufficient', () => {
      expect(() => bankAccount.withdraw(100)).toThrowError(
        'Insufficient balance'
      );
    });
    it('should not allow a negative withdrawal', () => {
      expect(() => bankAccount.withdraw(-100)).toThrowError(
        'Amount must be a positive number'
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
