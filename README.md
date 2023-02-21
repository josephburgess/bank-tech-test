# Bank Tech Test

A small TypeScript bank implementation that allows the user to:

- create a bank account
- deposit/withdraw from this account
- create a formatted account statement

from a REPL (eg `ts-node`).

## Background
________________________________________________________________
This was assigned as part of week 10 at Makers Academy. The core focus for the week was on producing the best code possible where there was a minimal time pressure.

We had to work alone, and also had to review our own code to practice reflecting on and improving our own work.

I chose to use TypeScript as I had not used it before starting this week and I wanted to use the solo-work as an opportunity to build knowledge in a new language, having been using JavaScript for the previous few weeks.

## Running the project
________________________________________________________________

To run this project, first clone the repository and run

```bash
npm install
```

to install the required packages.

Open up a REPL, e.g. `ts-node` and then run:

```
import {BankSystem, BankStatement} from './src/main'
```

to get access to the available classes (`BankSystem` and `BankStatement`).

You can create an instance of the `BankSystem` class, and start adding transactions to it by using the `.deposit()` and `.withdraw()` methods.
These methods both take an amount (number) and a date (string with `yyyy-mm-dd` format) as parameters, however the date is not required and will default to today's date if not specified.

In order to get a formatted statement of an account, create a new instance of `BankStatement` with `BankSystem.getAccount()` as an argument.
The `BankStatement.printStatement()` method will return a string with the formatted statement.

### Example usage
```ts
const bankSystem = new BankSystem();
const bankAccount = bankSystem.getAccount();
const bankStatement = new BankStatement(bankAccount);

bankSystem.deposit(1000);
bankSystem.deposit(2000);
bankSystem.withdraw(500);

bankStatement.printStatement();

// Output:

"Date        ||Credit      ||Debit       ||Balance"
"2023-02-21  ||            ||500.00      ||2500.00"
"2023-02-21  ||2000.00     ||            ||3000.00"
"2023-02-21  ||1000.00     ||            ||1000.00"
```


To run the tests for this project, run the below from the home directory.

```bash
npm run test
```



## Technical Details
________________________________________________________
The main account logic is contained in the `BankSystem` class, along with the `BankAccount` and `Transaction` types located in the types.ts file.

Internally, this class stores the transactions inside an array.
Each transaction is represented as an object of type `Transaction`, which contains the amount, the date, and the type (deposit | withdrawal) of transaction. Current data of the account (balance and transactions) are stored privately, in the shape of type `BankAccount`, and are accessed with the `getAccount()` method.

This class also ensures that we are not withdrawing too much money from an account.

The `BankStatement` class is responsible for generating a formatted account statement. It includes private methods to handle individual transaction formatting, and combines these into a single string with a header.

## Testing
________________________________________________________

Tests included unit tests for the `BankSystem` and `BankStatement` classes, as well as integration tests covering both classes and the `Transaction` and `BankAccount` types.

100% test coverage was achieved. I found TypeScript particularly enjoyable and robust to use for this project as it then limited my need for testing certain edge cases given the explicit nature of the typed language.

![Alt text](/images/test-coverage.png)

## Things to add
________________________________________________________

- Use a database instead or a file system to keep track of multiple accounts centrally.
- Create a command-line interface or web app to allow the user to easily add transactions to their account.
- Allow the user to perform more complex actions, such as transfers and standing orders.
- Add user info in order to differentiate between accounts and settings to allow for more customization.