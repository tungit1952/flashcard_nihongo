const mongoose = require('mongoose');
const typeAlphabet = require("../config/type_aphabet.config");

const Schema = mongoose.Schema;
const Alphabet = new Schema({
    word: {
        type: String,
        required: true
    },
    audio: {
        type: String,
    },
    reading: {
        type: String,
    },
    type:{
        type: typeAlphabet,
        default: typeAlphabet.HIRAGANA
    },
    row:{
        type: Number,
    },
    col:{
        type: Number,
    },
})

module.exports = mongoose.model('Alphabet', Alphabet);