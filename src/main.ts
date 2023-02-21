import { BankStatement } from './bank-statement';
import { BankSystem } from './bank-system';

function startRepl() {
  const bankSystem = new BankSystem();
  const bankStatement = new BankStatement(bankSystem.getAccount());

  const repl = require('repl').start('> ');
  repl.context.bankSystem = bankSystem;
  repl.context.bankStatement = bankStatement;
}

startRepl();
