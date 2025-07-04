const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    },
    saving: {
        type: String,
        required: true
    }
});
const Product = mongoose.model('Product', productSchema);   

module.exports = Product;