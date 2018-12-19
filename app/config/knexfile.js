// This file was created to seed database separately and avoid unnecessary runs
require('rootpath');
const config = require('config');

const dbConfig = config.get('postgresql');

const configData = {
    client: 'pg'
};

if(process.env.NODE_ENV === 'production') {
    configData.connection = dbConfig.database;
    configData.ssl = true;
} else {
    configData.connection = {
        host : dbConfig.host,
        user : dbConfig.user,
        password : dbConfig.password,
        database : dbConfig.database,
        port : dbConfig.port,
        charset : 'utf8',
    }
}
configData.connection.migrations = {
    directory: `${__dirname}/migrations`,
    tableName : 'migrations'
};
configData.connection.pool = {
    min: dbConfig.min,
    max: dbConfig.max
}

module.exports = configData