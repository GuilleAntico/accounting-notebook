const { model, Schema } = require('mongoose');

const transactionSchema = new Schema({

    type : {
        type: String,
        required: [true, 'Type is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    effectiveDate: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        required: true
    }
});


module.exports = {
    Transaction: model('Transaction', transactionSchema),
    transactionSchema
}