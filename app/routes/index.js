const path = require('path');
const fs = require('fs');

module.exports = (app, express) =>{
    const routesPath = path.join(__dirname, "./");
    fs.readdirSync(routesPath).map( file =>{
        if(file === 'index.js') return;
        // eslint-disable-next-line import/no-dynamic-require, global-require
        require(`./${file}`)(app, express);
    });
};