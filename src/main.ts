import { BankAccount } from './bank-account';
import { BankStatement } from './bank-statement';

function startRepl() {
  const account = new BankAccount();
  const statement = new BankStatement();

  const deposit = (amount: number) => account.deposit(amount);
  const withdraw = (amount: number) => account.withdraw(amount);
  const print = () => account.printStatement(statement);

  const repl = require('repl').start('> ');
  repl.context.account = account;
  repl.context.statement = statement;
  repl.context.deposit = deposit;
  repl.context.withdraw = withdraw;
  repl.context.print = print;
}

startRepl();
