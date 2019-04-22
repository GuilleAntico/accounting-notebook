
const UserController = require('app/controllers/user.controller');
const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);

module.exports = (app, express) => {
    const userController = new UserController(app);
    const api            = express.Router();
    
    api.post('/', async (req, res, next)=>{
        try{
            const data = req.body;
            devConsole.info(`creating user with data ${data}`);
            const user = await userController.create(data);
            devConsole.info(`User created ${JSON.stringify(user)}`);
            res.json(user);
        }catch(error){
            devConsole.error(`Error admin login ${error}`);
            next(error);
        }
        
    });
    app.use('/users', api);
}