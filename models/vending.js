const mongoose = require('mongoose');

const vendingSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    quantity: Number,
    cost: Number,
    bought: Number
})

const items = mongoose.model('items', vendingSchema);

module.exports = items;
