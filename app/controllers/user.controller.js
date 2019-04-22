const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);

class UserController {
    constructor(app) {
        this.User = app.get('models').User.model;
        this.mongoose = app.get('mongoose');
    }
    
    async create(data) {
        try {
            const user = new this.User(data);
            await user.save();
            return user;
        }catch(error){
            devConsole.error('Error getUser: ', error);
            return Promise.reject(error);
        }
    }
    
}


module.exports = UserController;