const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const typeVocabulary = require('../config/type_vocabulary.config')
const level = require('../config/level_nihongo.config')
const Vocabulary = new Schema({
    word: {
        type: String,
        require: true
    },
    type: {
        type: String,
        default: typeVocabulary.VOCABULARY
    },
    translation: {
        type: String,
        require: true
    },
    readings: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        default: level.N5
    },
    description: {
        type: String
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

module.exports = mongoose.model('Vocabularies', Vocabulary);