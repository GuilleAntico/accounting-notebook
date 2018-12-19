
const UserController = require('app/controllers/user.controller');
const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);

module.exports = (app, express) => {
    const userController = new UserController(app);
    const api            = express.Router();
    
    api.get('/', async (req, res, next)=>{
        try{
            devConsole.info('fetching user from db');
            const user = await userController.getUser();
            devConsole.info(`User fetched ${JSON.stringify(user)}`);
            res.json(user);
        }catch(error){
            devConsole.error(`Error admin login ${error}`);
            next(error);
        }
        
    });
    app.use('/users', api);
}