const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {type: String,},
    email: {type: String, },
    password: {type: String, },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('User',userSchema);