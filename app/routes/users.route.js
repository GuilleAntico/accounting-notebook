
const UserController = require('app/controllers/user.controller');
const DevConsole = require('@devConsole');
const devConsole = new DevConsole(__filename);
const authenticate = require('@authenticate');

module.exports = (app, express) => {
    const userController = new UserController(app);
    const api            = express.Router();
    
    
    /**
     * @swagger
     * /users:
     *    post:
     *      summary: Create a new User
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: user
     *            description: The user to create
     *            schema:
     *              type: object
     *              required:
     *                  - name
     *                  - avatar
     *              properties:
     *                  name:
     *                    type: string
     *                    example: "Guillermo"
     *                  avatar:
     *                    type: string
     *                    example: "http://avatar.com"
     *      responses:
     *          200:
     *              description: OK
     *              examples:
     *                  application/json:
     *                      {
     *                          "_id": 1234,
     *                          "name": "Guillermo",
     *                          "avatar": "http://avatar.com"
     *                      }
     */
    api.post('/', authenticate, async (req, res, next)=>{
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
    api.post('/pepe', async (req, res, next)=> {
        res.send('ok');
    })
    app.use('/users', api);
}