const DevConsole = require('@devConsole');
const ApiError = require('app/error/ApiError');
const { Transaction } = require('app/models');
const balanceController = require('app/controllers/balances.controller');

const devConsole = new DevConsole(__filename);

class TransactionController {
    
    static async create(data) {
        try {
            const newTransaction = { ...data };
            let balance = newTransaction.balance || null;
            // for testing purposes i'm forcing the balance object
            if(!newTransaction.balance){
                balance = await balanceController.findFirst();
                if(!balance){
                    newTransaction.balance = await balanceController.create({ amount : 0 }).save();
                }else{
                    newTransaction.balance = balance;
                }
            }
            if(newTransaction.type === 'debit' && !this.checkPositiveBalance(balance.amount, newTransaction.amount)){
             throw new ApiError('InvalidParam', 'Negative balance amount result');
            }
            
            const transaction = new Transaction(newTransaction);
            if(newTransaction.type === 'debit'){
                balance.amount = parseFloat(balance.amount) - parseFloat(newTransaction.amount);
            }else{
                balance.amount = parseFloat(balance.amount) + parseFloat(newTransaction.amount);
            }
            await balance.save();
            transaction.balance = balance.amount;
            return await transaction.save();
        }catch(error){
            devConsole.error('Error creating transaction: ', error.message);
            return Promise.reject(error);
        }
    }

    static async getById(transactionId){
        try {
            const transaction = await Transaction.findById(transactionId);
            if(!transaction) throw ApiError('NotFound', `Transaction Id : ${transactionId} not found`);
            return transaction;
        }catch(error){
            return Promise.reject(error);
        }
    }
    
    static async getHistory(){
        try {
            return await Transaction.find({},[],{ sort: { effectiveDate: -1 }});
        }catch(error){
            return Promise.reject(error);
        }
    }
    
    static checkPositiveBalance(balanceAmount, transactionAmount){
        return (parseFloat(balanceAmount) - parseFloat(transactionAmount) >= 0);
    }
}

module.exports = TransactionController;