const AppError = require("./AppError");

class ForbiddenError extends AppError {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403;
    }
}

module.exports = ForbiddenError;