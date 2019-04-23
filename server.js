require('module-alias/register');
const cluster = require('cluster');
const os = require('os');
const config = require('config');
const ServerService = require('./services/Server');

if(cluster.isMaster){
    if(config.get('nodeEnv') === 'production'){
        // Count the machine's CPUs
        const cpuCount = os.cpus().length;
    
        // Create a worker for each CPU
        for (let i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    } else {
        // Just fork once for dev
        cluster.fork();
    }
} else {
    ServerService.start();
}


