const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type: String,},
    city: {type: String,},
    address: {type: String,},
    phone: {type: String, },
    email: {type: String, },
    numPills: {type: Number, },
    pricePerPills: {type: Number, }, 
    remarks: {type: String},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

module.exports = mongoose.model('Product',productSchema);