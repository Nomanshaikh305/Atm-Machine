#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

interface UserInput {
    userID: string,
    userPIN: number,
    accountType: string,
    transactionType: string,
    amount: number,
}

    console.log(chalk.green.bold("\n \t Welcome to Bank AL Habib!\n"))


    const userInput: UserInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'userID',
            message: 'Kindly enter your user ID'
        },
        {
            type: 'number',
            name: 'userPIN',
            message: 'Kindly enter your user PIN'
        },
        {
            type: 'list',
            name: 'accountType',
            choices: ['Current','Savings'],
            message: 'Select your Account Type'
        },
        {
            type: 'list',
            name: 'transactionType',
            choices: ["Fastcash Withdrawal","Normal Withdrawal","Balance Inquiry"],
            message: 'Select your transactionType'
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter amount you want to withdraw',
            when(userInput){
                return userInput.transactionType === "Normal Withdrawal"
            }
        },
        {
            type: 'list',
            name: 'amount',
            choices: [1000,2000,5000,10000,20000,25000],
            message: "Select amount you want to withdraw",
            when(userInput){
                return userInput.transactionType === "Fastcash Withdrawal"
            }
        }
    ]);

    const userID = userInput.userID;
    const userPIN = userInput.userPIN;
    const enteredAmount = userInput.amount;

    if((userID && userPIN) && userInput.transactionType ==="Balance Inquiry"){
        const userBalance = Math.floor(Math.random() * 1000000);
        console.log(`Your current balance is Rs ${chalk.blue.bold(userBalance)}\n`)
    }else if(userID && userPIN){
        const userBalance2 = Math.floor(Math.random() * 1000000);
        if(userBalance2 > enteredAmount){
            console.log(`Your account has been debited with Rs ${chalk.blue.bold(enteredAmount)} and your remaining balance is Rs ${chalk.blue.bold(userBalance2 - enteredAmount)}`);
        }else{
            console.log(chalk.blue.bold('\n Unsufficient Balance'));
        }
    }