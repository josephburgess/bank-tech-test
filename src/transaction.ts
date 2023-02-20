export class Transaction {
  amount: number;
  date: Date;
  type: 'deposit' | 'withdrawal';

  constructor(amount: number, date: Date, type: 'deposit' | 'withdrawal') {
    this.amount = amount;
    this.date = date;
    this.type = type;
  }
}
