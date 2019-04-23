const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');

const port = config.get('port');
const DevConsole = require('@devConsole');

const devConsole = new DevConsole(__filename);
const morganMiddleware = require('app/config/morgan');
const routes = require('app/routes');
const errorHandler = require('app/middlewares/errorHandler');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

class Server {
    static async setupExpress() {
        try {
            const app = express();
    
            // Setup Port
            app.set('port', port);
            // Setup morgan
            app.use(morganMiddleware);
    
            // Body Parser
            app.use(bodyParser.json({ limit : '5mb', extended: true}));
    
            // Setup Helmet
            app.use(helmet());
            
            // Serve a basic text page at the root
            app.get('/', (req, res)=>{
                res.send('SampleApp API');
                res.end();
            });
            devConsole.info('Express has been configured');
            return app;
        } catch(error) {
            devConsole.error('Error setting express');
            return Promise.reject(error);
        }
    }

    static async setupDatabase() {
        try {
            const mongodbConfig = config.get('mongodb');
            // Create mongoose connection
            const { connection } = await mongoose.connect(`mongodb://${mongodbConfig.host}/${mongodbConfig.name}`, { useNewUrlParser: true });
            mongoose.set('useFindAndModify', false);
            connection.on('open', ()=> devConsole.info('Database setup okay'));
            connection.on('error', ()=> devConsole.info('Database setup Error'));
            return true;
        } catch(error) {
            devConsole.error('Error setting up Database: ');
            return Promise.reject(error)
        }
    }
    
    static async setupLogger(app) {
        app.use((req, res, next) => devConsole.contextMiddleware(req, res, next));
        devConsole.info('Logger Initialized');
    }
    
    static async setupCORS(app) {
        try {
            // CORS
            const allowedDomains = [ 'localhost', '127.0.0.1'];
            const allowedProtocols = [ 'http://', 'https://'];
    
            // Todo: create swtich case for different envs
    
            const allowedOrigins = [];
    
            allowedProtocols.map( protocol =>allowedDomains.map( domain => {
                const origin = protocol + domain;
                return allowedOrigins.push(new RegExp(origin));
            }));
    
    
            const corsOptions = {
                origin: allowedOrigins,
                allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'Authorization',
                    'If-None-Match'
                ],
                credentials: true,
                maxAge: 60 * 10
            };
    
            app.use(cors(corsOptions));
            app.options('*', cors(corsOptions));
            devConsole.info('CORS allowing origins:', allowedOrigins.map(origin=>origin.toString()));
            return true;
        } catch (error) {
            devConsole.error('Error Setting CORS');
            return Promise.reject(error);
        }
    }
    
    static async setupRoutes(app) {
        try {
            routes(app, express);
            devConsole.info('Routes set!');
            return true;
        } catch(error) {
            devConsole.error('Error setting routes');
            return Promise.reject(error);
        }
    }
    
    static async setupSwagger(app) {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'Articles API',
                    version: '1.0.0',
                    description: 'Test Express API with swagger doc',
                },
                securityDefinitions: {
                    ApiKeyAuth: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header'
                    }
                },
                security: [
                    { "ApiKeyAuth": []}
                ],
            },
            apis: ['app/routes/*.route.js'],
        };
        const specs = swaggerJsdoc(options);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        app.get('/api-docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(specs);
        });
    
    }
    
    static async setupErrorHandler(app) {
        try {
            app.use((error, req, res, next) => errorHandler(error, req, res, next));
            devConsole.info('Error handler set!');
        } catch(error) {
            devConsole.error('Error initializing Error Handler');
            Promise.reject(error);
        }
    }

    static async startService(app) {
        try {
            await app.listen(app.get('port'));
            devConsole.info('Express up and running on port ', app.get('port'));
            return true;
        } catch(error) {
            devConsole.error('Error initializing express');
            return Promise.reject(error);
        }
    }

    static async start() {
        try {
            const app = await this.setupExpress();
            await this.setupDatabase(app);
            await this.setupLogger(app);
            await this.setupCORS(app);
            await this.setupRoutes(app);
            await this.setupSwagger(app);
            await this.setupErrorHandler(app);
            devConsole.info('Bootstrapping done!!');
            await this.startService(app);
        } catch(error) {
            devConsole.error(`Error Bootstrapping app ${error}`);
            process.exit(1);
        }
    }
}

module.exports = Server;