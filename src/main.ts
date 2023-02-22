import { BankAccount } from './bank-account';
import { BankStatement } from './bank-statement';

function startRepl() {
  const account = new BankAccount();
  const statementPrinter = new BankStatement();

  const deposit = (amount: number) => account.deposit(amount);
  const withdraw = (amount: number) => account.withdraw(amount);
  const print = () => account.printStatement(statementPrinter);

  const repl = require('repl').start('> ');
  repl.context.account = account;
  repl.context.statementPrinter = statementPrinter;
  repl.context.deposit = deposit;
  repl.context.withdraw = withdraw;
  repl.context.print = print;
}

startRepl();
