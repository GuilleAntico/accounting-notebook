const { model, Schema } = require('mongoose');

const balanceSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
});


module.exports = {
    Balance: model('Balance', balanceSchema),
    balanceSchema
}