const Tag = require("../models/tags.model");
const {ValidationError} = require("../exceptions");

const TagService = {
    async create(body) {
        const newTag = new Tag(body);
        return await newTag.save();
    },
    async list() {
        return await Tag.find();
    },

    async update(id, body) {
        const updatedTag = await Tag.findByIdAndUpdate(id, body, {new: true});
        if (!updatedTag) {
            throw new ValidationError('Không tìm thấy bản ghi!');
        }
        return updatedTag;
    },

    async delete(id) {
        const deletedTag = await Tag.findByIdAndDelete(id); // Xóa từ vựng
        if (!deletedTag) {
            throw new ValidationError('Vocabulary not found');
        }
        return deletedTag;
    }
}
module.exports = TagService;