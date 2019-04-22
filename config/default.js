const config = {
    port: process.env.PORT || 5000,
    logLevel : 'info',
    nodeEnv: process.env.NODE_ENV,
    rootUrl: process.env.ROOT_URL,
    jwtSecret: process.env.JWT_SECRET || 'superSecretAndLongPhrase',
    apiToken: process.env.API_TOKEN || '5CD4ED173E1C95FE763B753A297D5', // Just for excersice purposes, not recommended
    mongodb: {
        host: process.env.MONGO_HOST || 'localhost',
        name: process.env.MONGO_USER || 'articles',
    }
}

module.exports = config;