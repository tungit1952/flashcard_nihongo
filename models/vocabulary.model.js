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
    readings: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    tags:{
      type: Array,
      default: []
    },
    example: {
        sentence: {
            type: String
        },
        translation: {
            type: String
        }
    },
})
Vocabulary.plugin(mongoosePaginate);
module.exports = mongoose.model('Vocabularies', Vocabulary);