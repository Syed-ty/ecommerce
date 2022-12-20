const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    cardName:  { type: String },
    cvv: { type: String }
});


const payment = mongoose.model('payment',paymentSchema);

module.exports = {payment}