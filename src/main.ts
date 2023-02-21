import { BankStatement } from './bank-statement';
import { BankSystem } from './bank-system';

function startRepl() {
  const bankSystem = new BankSystem();
  const bankStatement = new BankStatement(bankSystem.getAccount());
  const deposit = (amount: number) => bankSystem.deposit(amount);
  const withdraw = (amount: number) => bankSystem.withdraw(amount);
  const print = () => bankStatement.printStatement();

  const repl = require('repl').start('> ');
  repl.context.bankSystem = bankSystem;
  repl.context.bankStatement = bankStatement;
  repl.context.deposit = deposit;
  repl.context.withdraw = withdraw;
  repl.context.print = print;
}

startRepl();
