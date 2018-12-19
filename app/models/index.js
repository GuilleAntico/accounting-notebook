const path = require('path');
const bookshelf = require('bookshelf');
const fs = require('fs');

module.exports = (app) =>{
    const knex = app.get('knex');
    const bookshelfInstance = bookshelf(knex);
    bookshelfInstance.plugin('registry');
    bookshelfInstance.plugin('visibility');
    bookshelfInstance.plugin('virtuals');
    app.set('bookshelf', bookshelfInstance);
    
    const modelsPath = path.join(__dirname, "./");
    
    const exports = {};
    
    fs.readdirSync(modelsPath).map( file =>{
        if(file === 'index.js') return;
        const name = file.replace('.js', '');
        // eslint-disable-next-line import/no-dynamic-require, global-require
        exports[name] = require(`./${file}`)(app);
        return true;
    });
    
    return exports;
};