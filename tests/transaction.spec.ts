import { Transaction } from '../src/transaction';

describe('Transaction', () => {
  it('should create a deposit transaction with the correct properties', () => {
    const transaction = new Transaction(100, new Date('2023-01-10'), 'deposit');
    expect(transaction.date).toEqual(new Date('2023-01-10'));
    expect(transaction.amount).toEqual(100);
    expect(transaction.type).toEqual('deposit');
  });

  it('should create a withdrawal transaction with the correct properties', () => {
    const transaction = new Transaction(
      50,
      new Date('2023-01-11'),
      'withdrawal'
    );
    expect(transaction.date).toEqual(new Date('2023-01-11'));
    expect(transaction.amount).toEqual(50);
    expect(transaction.type).toEqual('withdrawal');
  });
});
