const Vocabulary = require("../models/vocabulary.model");
const {ValidationError} = require("../exceptions");

const VocabularyService = {
    async create(body) {
        if (body.readings) body.readings = JSON.stringify(body.readings)
        const newVocabulary = new Vocabulary(body);
        return await newVocabulary.save();
    },
    async list() {
        return await Vocabulary.find();
    },

    async update(id, body) {
        if (body.readings) body.readings = JSON.stringify(body.readings);
        const updatedVocabulary = await Vocabulary.findByIdAndUpdate(id, body, {new: true}); // Cập nhật từ vựng
        if (!updatedVocabulary) {
            throw new ValidationError('Không tìm thấy bản ghi!');
        }
        return updatedVocabulary;
    },

    async delete(id) {
        const deletedVocabulary = await Vocabulary.findByIdAndDelete(id); // Xóa từ vựng
        if (!deletedVocabulary) {
            throw new ValidationError('Vocabulary not found');
        }
        return deletedVocabulary;
    }
}
module.exports = VocabularyService;