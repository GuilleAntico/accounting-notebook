const { Schema, SchemaTypes } = require('mongoose');
require('mongoose-type-url');

const userSchema = new Schema({
name : {
    type: String,
    required: [true, 'Name is required'],
},
avatar: {
    type: SchemaTypes.Url,
    required: [true, 'Avatar is required and must be a valid URL']
}
});

module.exports = app => ({
    model: app.get('mongoose').model('User', userSchema),
    schema: userSchema
})