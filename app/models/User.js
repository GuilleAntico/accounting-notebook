const Joi = require('joi');
const ApiError = require('app/error/ApiError');

const schema = Joi.object().keys({
    id: [Joi.number().optional(), Joi.allow(null)],
    created: Joi.date().timestamp(),
    modified: Joi.date().timestamp(),
    email : Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});
module.exports = (app) => app.get('bookshelf').model('User', {
    tableName: 'users',
    hasTimestamps : ['created','modified'],
    initialize(){
        this.on('creating', this.validateSave, this);
        this.on('updating', this.validateUpdate, this);
    },
    validateSave() {
        const errors = Joi.validate(this.attributes, schema);
        if(errors.error) {
            throw new ApiError('ValidationError', errors)
        }
        return true;
    },
    validateUpdate() {
        const updateSchema = Joi.object().keys({
            id: [Joi.number().optional(), Joi.allow(null)],
            created: Joi.date().timestamp(),
            modified: Joi.date().timestamp(),
            email : Joi.string().email().required(),
            token: [Joi.string().optional(), Joi.allow(null)],
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        });
        const errors = Joi.validate(this.attributes,updateSchema);
        if(errors.error) {
            throw new ApiError('ValidationError', errors)
        }
        return true;
    }
});