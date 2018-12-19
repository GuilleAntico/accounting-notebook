const Joi = require('joi');

const schema = Joi.object().keys({
    created: Joi.date().timestamp(),
    modified: Joi.date().timestamp(),
    name : Joi.string().required()
});

module.exports = (app) => app.get('bookshelf').model('Breed', {
        tableName: 'breeds',
        hasTimestamps : ['created','modified'],
        initialize(){
            this.on('saving', this.validate, this);
        },
        validate() {
            return Joi.validate(this.attributes, schema);
        },
        Type(){
            return this.belongsTo('Type', 'type_id');
        }
});