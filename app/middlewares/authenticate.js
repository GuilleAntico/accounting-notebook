const passport   = require('passport');
const { Strategy, ExtractJwt }   = require('passport-jwt');
const config = require('config');

const jwtSecret = config.get('jwtSecret');
const DevConsole = require('@devConsole');
const { generateToken } = require('devUtilities/token');

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
            res.status(401).end('Unauthorized');
        }
    };
    if(process.env.NODE_ENV === 'development' && !req.headers.authorization){
        devConsole.info('Bypassing token');
        const object = {
            id: 1,
            first_name: 'Guille',
            last_name: 'Antico',
            email: 'guille@antico.com'
        };
        const token = generateToken(object);
        req.headers.authorization = `Bearer ${token}`
    }
    return passport.authenticate('jwt', { session: false })(req, resOverride, next);
};