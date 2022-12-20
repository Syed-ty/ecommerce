const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartData: [{
        productId: {
            type: String
        }
    }]
});


const cart = mongoose.model('cart', cartSchema);

module.exports = {
    cart
}