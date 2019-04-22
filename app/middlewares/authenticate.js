const passport   = require('passport');
const { Strategy, ExtractJwt }   = require('passport-jwt');
const config = require('config');

const jwtSecret = config.get('jwtSecret');
const DevConsole = require('@devConsole');
const { generateToken } = require('devUtilities/tokenGenerator');
const ApiError = require('app/error/ApiError');

const devConsole = new DevConsole(__filename);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;
const JwtStrategy = new Strategy(opts, (jwtPayload, done) =>
    // Add any additional logic before accessing the route.
    done(null, jwtPayload)
);

passport.use(JwtStrategy);

module.exports = (req, res, next) => {
    const resOverride = {
        end: () => {
            devConsole.error('HTTP Status 401 - Unauthorized error in authenticate');
            throw new ApiError('AuthToken');
        }
    };
    if(config.get('nodeEnv') === 'development'){
        devConsole.info('Forcing token match');
        const headerToken = req.headers.authorization;
        const envToken = config.get('apiToken');
         if(!headerToken || headerToken !== envToken) throw new ApiError('AuthToken');
         return next();
    }
    return passport.authenticate('jwt', { session: false })(req, resOverride, next);
};