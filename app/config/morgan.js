const morgan = require('morgan');
const config = require('config');

const nodeEnv = config.get('nodeEnv');

morgan.token('request-id', (req) => req.id);
morgan.token('app-user', (req) => {
    if (req.user && req.user.id) {
        return req.user.id;
    }
    
        return '';
    
});

let morganMiddleware;

if (nodeEnv === 'development') {
    morganMiddleware = morgan('dev');
} else {
    morganMiddleware = morgan(`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent" :app-user :request-id`);
}

module.exports = morganMiddleware;
