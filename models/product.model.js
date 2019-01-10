const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    reference: Number,
    name: String,
    description: String,
    priceHT: Number,
    TVARate: Number
},
{
    collection:'products'
});

module.exports = mongoose.model('Product', ProductSchema);