const TagService = require("../../services/tag.service");
const tagController = {
    create: async (request, response, next) => {
        try {
            console.log(request.body)
            const newTag = await TagService.create(request.body);
            response.status(201).json(newTag);
        } catch (error) {
            next(error);
        }
    },

    list: async (request, response, next) => {
        try {
            const tags = await TagService.list();
            response.status(200).json(tags);
        } catch (error) {
            next(error);
        }
    },

    update: async (request, response, next) => {
        const { id } = request.params;
        try {
            const updatedTag = await TagService.update(id, request.body);
            response.status(200).json(updatedTag);
        } catch (error) {
            next(error);
        }
    },

    delete: async (request, response, next) => {
        const { id } = request.params;
        try {
            const deletedTag = await TagService.delete(id);
            response.status(200).json(deletedTag);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = tagController