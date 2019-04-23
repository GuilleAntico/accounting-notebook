const { model, Schema, SchemaTypes } = require('mongoose');

const articleSchema = new Schema({

    title : {
        type: String,
        required: [true, 'Name is required'],
    },
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    tags: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, 'At least one tag is required'],
    },
    user:  {
        type: SchemaTypes.ObjectId,
        ref:'User',
        required: [true, 'Article must have a User']
    }
});

module.exports = {
    Article: model('Article', articleSchema),
    schema: articleSchema
}