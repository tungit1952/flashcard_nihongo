const VocabularyService = require("../../services/vocabulary.service");
const vocabularyController = {
    create: async (request, response, next) => {
        try {
            console.log(request.body)
            const newVocabulary = await VocabularyService.create(request.body);
            response.status(201).json(newVocabulary);
        } catch (error) {
            next(error);
        }
    },

    list: async (request, response, next) => {
        try {
            const vocabularies = await VocabularyService.list(request.query);
            response.status(200).json(vocabularies);
        } catch (error) {
            next(error);
        }
    },

    update: async (request, response, next) => {
        const { id } = request.params;
        try {
            const updatedVocabulary = await VocabularyService.update(id, request.body);
            response.status(200).json(updatedVocabulary);
        } catch (error) {
            next(error);
        }
    },

    delete: async (request, response, next) => {
        const { id } = request.params;
        console.log(id)
        try {
            const deletedVocabulary = await VocabularyService.delete(id);
            response.status(200).json(deletedVocabulary);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = vocabularyController