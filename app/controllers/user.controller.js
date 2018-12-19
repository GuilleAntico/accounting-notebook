const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);


class UserController {
    constructor(app) {
        this.knex = app.get('knex');
        this.User = app.get('models').User;
        this.schema = {
            facebook_id: '',
            token: null,
            first_name: '',
            last_name: '',
            active: true,
            role: 1,
            facebook_token: '',
            phone: null
        }
    }
    publicUser(user) {
        return {
            firstNme: user.firstNme,
            lastName: user.lastName,
            email: user.email,
            token: user.token,
        }
    }
    
    async getUser() {
        try {
            const user =  await this.User.forge().fetch();
            return this.publicUser(user.toJSON());
        }catch(error){
            devConsole.error('Error getUser: ', error);
            return Promise.reject(error);
        }
    }
    
}


module.exports = UserController;