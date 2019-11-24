const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Product = new Schema ({
    name: { type: String, required: true},
    seller_id: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    units: { type: Boolean, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Product', Product);