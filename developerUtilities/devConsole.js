const path = require('path');
const util = require('util');
const uuid = require('node-uuid');
const winston = require('winston');
const chalk = require('chalk');
const config = require('config');

const logLevel = config.get('logLevel');
const nodeEnv = config.get('logLevel');

const continuationLocalStorage = require('continuation-local-storage');

class DevConsole {
    constructor ( strPrefix = '') {
        this.pid = process.pid;
        this.strPrefix = path.basename(strPrefix);
        this.prefix = this.createPrefix(this.pid, this.strPrefix);
        this.logger = winston.createLogger({
            level: logLevel,
            transports: [
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/combined.log' })
            ]
        });
        // Adding Console log if not production
        if (nodeEnv !== 'production') {
            this.logger.add(new winston.transports.Console({
                timestamp: true,
                format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
                )
            }));
        }
        
        this.storage = continuationLocalStorage.createNamespace('request');
    }
    
    createPrefix (pid = 0, prefix = '') {
        const reqId = (this.storage && this.storage.get('requestId')) || 'NO-REQ-ID';
        
        return `[${pid}:${reqId}:${prefix}], `;
    }
    
    contextMiddleware (req, res, next) {
        const reqId = req.headers['x-request-id'] || uuid.v4();
        req.id = reqId;
        this.storage.bindEmitter(req);
        this.storage.bindEmitter(res);
        this.storage.run(() => {
            this.storage.set('requestId', reqId);
            next();
        });
    }

    error (...args) {
        const message = this.formatMessage(...args);
        this.logger.error(chalk.red(message));
    }

    warn (...args) {
        const message = this.formatMessage(...args);
        this.logger.warn(chalk.yellow(message));
    }

    info (...args) {
        const message = this.formatMessage(...args);
        this.logger.info(chalk.green(message));
    }
    
    formatMessage (...args) {
        this.prefix = this.createPrefix(this.pid, this.strPrefix);
        let paramsToUseForUtilFormat = [];
        if (args.length > 0) {
            if (typeof args[0] === 'string') {
                paramsToUseForUtilFormat = [this.prependPrefix(args[0]), args.slice(1)];
            } else {
                paramsToUseForUtilFormat = [this.prefix].concat(args);
            }
        } else {
            paramsToUseForUtilFormat = this.prefix;
        }
        
        return util.format(...paramsToUseForUtilFormat);
    }
    
    prependPrefix (str = '') {
        return `${this.prefix}${str}`;
    }
}

module.exports = DevConsole;