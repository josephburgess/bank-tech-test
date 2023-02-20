export class Transaction {
  date: Date;
  amount: number;
  type: 'deposit' | 'withdrawal';

  constructor(date: Date, amount: number, type: 'deposit' | 'withdrawal') {
    this.date = date;
    this.amount = amount;
    this.type = type;
  }
}
