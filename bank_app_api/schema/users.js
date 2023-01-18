const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String,
    balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Users", userSchema);