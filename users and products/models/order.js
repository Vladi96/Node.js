const mongoose = require('mongoose');

const orderShema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlenght: 3
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderShema);
module.exports = { Order }