const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String },
    price: { type: String },
    quantity: { type: String },
    imgUrl:{type: String}
});


const product = mongoose.model('product',productSchema);

module.exports = {product}