import { BankSystem } from './bank-system';
import { BankStatement } from './bank-statement';

const bankSystem = new BankSystem();
bankSystem.deposit(1000);
bankSystem.deposit(2000);
bankSystem.withdraw(500);
const bankAccount = bankSystem.getAccount();
const bankStatement = new BankStatement(bankAccount);
console.log(bankStatement.getStatement());

// Output:
// Date        ||Credit      ||Debit       ||Balance
// 2023-02-21  ||            ||500.00      ||2500.00
// 2023-02-21  ||2000.00     ||            ||3000.00
// 2023-02-21  ||1000.00     ||            ||1000.00
