const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const Vocabulary = new Schema({
    word: {
        type: String,
        require: true
    },
    translation: {
        type: String,
        require: true
    },
    audio: {
        type: String,
    },
    tags:{
      type: Array,
      default: []
    },
    example: {
        type: String,
    },
    reading: {
        type: String,
    },
})
Vocabulary.plugin(mongoosePaginate);
module.exports = mongoose.model('Vocabularies', Vocabulary);