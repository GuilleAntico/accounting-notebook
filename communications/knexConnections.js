const knex = require('knex');
const config = require('config');

const dbConfig = config.get('postgresql');
let connections = [];
let isolatedConnections = [];
const DevConsole  = require('@devConsole');
const devConsole = new DevConsole(__filename);

const createConnection = (app, isolatedConnection) =>{
    
    const pool = {
        min: dbConfig.min,
        max: dbConfig.max
    }
    let connection = {};
    if(process.env.NODE_ENV === 'production'){
        connection = dbConfig.database;
    } else {
        connection = {
            user: dbConfig.user,
            password: dbConfig.password,
            host: dbConfig.host,
            port: dbConfig.port,
            database: dbConfig.database
        }
    }
    connection.migrations = {
        directory: `${__dirname}/../app/config/migrations`,
        tableName : 'migrations'
    }
    if(process.env.NODE_ENV === 'development') {
        pool.requestTimeout = 2000;
    }
    connection.pool = pool;
    return new Promise((resolve) =>{
        
        const client = knex({
            client: 'pg',
            version: '10.1',
            connection,
        });
        if(isolatedConnection){
            devConsole.info('Creating Isolated Connection');
            isolatedConnections.push(client);
        } else {
            connections.push(client);
        }
        app.set('knex', client);
        devConsole.info('Setup Database Configured');
        resolve();
    })
};
const runMigrations = async (app) => {
   try {
       const knexInstance = app.get('knex');
       devConsole.info('Running migrations');
       knexInstance.migrate.latest();
       devConsole.info('Migrations ran ok!!');
   } catch(error){
       console.error('Error running migrations');
       return Promise.reject(error);
   }
   
}

const closeAll = () =>{
    devConsole.info(`Closing ${  connections.length  } Knex Connenctions`);
    const promises = [];
    connections.map((connection, index) =>{
        promises.push(connections[index].destroy());
        return connection;
    });
    connections = [];
    return Promise.all(promises)
    .catch((err) => {
        devConsole.error("ERRRR", err)
        
    });
};

const closeAllIsolated = () =>{
    devConsole.info(`Closing ${  isolatedConnections.length  } Isolated Knex Connenctions`);
    const promises = [];
    isolatedConnections.map((connection, index) =>{
        promises.push(isolatedConnections[index].destroy());
        return connection;
    });
    isolatedConnections = [];
    return Promise.all(promises)
    .catch((err) => {
        devConsole.error("ERRRR", err)
    });
};
const getConnections = () => connections;

module.exports = {
    createConnection,
    closeAll,
    closeAllIsolated,
    getConnections,
    runMigrations
}