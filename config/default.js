const config = {
    port: process.env.PORT || 5000,
    logLevel : 'info',
    nodeEnv: process.env.NODE_ENV,
    rootUrl: process.env.ROOT_URL,
    jwtSecret: process.env.JWT_SECRET || 'superSecretAndLongPhrase',
    mongodb: {
        host: process.env.MONGO_HOST || 'localhost',
        name: process.env.MONGO_USER || 'accounting-notebook',
    }
}

module.exports = config;