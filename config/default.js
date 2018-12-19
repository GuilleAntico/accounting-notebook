const config = {
    port: process.env.PORT || 5000,
    logLevel : 'info',
    nodeEnv: process.env.NODE_ENV,
    rootUrl: process.env.ROOT_URL,
    jwtSecret: process.env.JWT_SECRET || 'superSecretAndLongPhrase',
    postgresql: {
        max: 8,
        min: 1,
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres',
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT  || 5432,
        database: (() => {
            if(process.env.CUSTOM_DB_URL) return process.env.CUSTOM_DB_URL;
            return 'food_truck';
        })()
    }
}

module.exports = config;