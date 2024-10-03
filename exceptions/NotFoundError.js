const AppError = require("./AppError");

class NotFoundError extends AppError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;