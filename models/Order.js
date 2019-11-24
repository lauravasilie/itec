const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new Schema ({
    products: [{
        product_id: { type: String, required: true },
        buyer_id: { type: String, required: true },
        quantity: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    time: { type: Number, required: true }
});

module.exports = mongoose.model('Order', Order);