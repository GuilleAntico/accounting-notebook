
const transactionsController = require('app/controllers/transactions.controller');
const DevConsole = require('@devConsole');

const devConsole = new DevConsole(__filename);
const authenticate = require('@authenticate');

module.exports = (app, express) => {
    const api            = express.Router();
    
    api.post('/', authenticate, async (req, res, next)=>{
        try{
            const data = req.body;
            devConsole.info(`creating transaction with data ${JSON.stringify(data)}`);
            const article = await transactionsController.create(data);
            devConsole.info(`Transaction created ${JSON.stringify(article)}`);
            res.json(article);
        }catch(error){
            next(error);
        }
        
    });
   
    api.get('/:transactionId', authenticate, async (req, res, next)=>{
        try{
            const {transactionId} = req.params;
            devConsole.info(`Fetching transaction with Id: ${transactionId}`);
            const result = await transactionsController.getById(transactionId);
            devConsole.info(`Transaction found ${JSON.stringify(result)}`);
            res.json(result);
        }catch(error){
            next(error);
        }
    });
    api.get('/', authenticate, async (req, res, next) =>{
        try{
            devConsole.info(`Fetching transaction history`);
            const result = await transactionsController.getHistory();
            devConsole.info(`Transaction history ${JSON.stringify(result)}`);
            res.json(result);
        }catch(error){
            next(error)
        }
    });
    
    app.use('/transactions', api);
}