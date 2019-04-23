const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);
const { User } = require('app/models');

class UsersController {
    
    static async create(data) {
        try {
            const user = new User(data);
            await user.save();
            return user;
        }catch(error){
            devConsole.error('Error getUser: ', error);
            return Promise.reject(error);
        }
    }
    
}


module.exports = UsersController;