const DevConsole = require('@devConsole');
const { Balance } = require('app/models');

const devConsole = new DevConsole(__filename);

class BalanceController {
    
    static async create(data) {
        try {
            const balance = new Balance(data);
            await balance.save();
            return balance;
        }catch(error){
            devConsole.error('Error creating balance: ', error.message);
            return Promise.reject(error);
        }
    }
    
    static async findFirst() {
        try {
            return Balance.findOne();
        }catch(error){
            devConsole.error('Error creating balance: ', error.message);
            return Promise.reject(error);
        }
    }
}

module.exports = BalanceController;