const mongoose = require('mongoose');
const typeVocabulary = require("../config/type_vocabulary.config");
const status = require("../config/status.config");

const Schema = mongoose.Schema;
const Tag = new Schema({
    key: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: status.ACTIVE
    },
    description: {
        type: String,
    }
})
module.exports = mongoose.model('Tags', Tag);