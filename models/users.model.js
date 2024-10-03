const mongoose = require('mongoose');
const status = require("../config/status.config");

const Schema = mongoose.Schema;
const User = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: status.ACTIVE
    },
    created_at: {
        type: Date,
        default: Date
    },
})
module.exports = mongoose.model('Users', User);