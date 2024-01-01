const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    area: {type: String, required: false},
    address: {type: String, required: true},
    phone: {type: String, },
    email: {type: String, },
    products: {type: Array, }, 
    category: {type: Array, }, 
});

module.exports = mongoose.model('Post',postSchema);