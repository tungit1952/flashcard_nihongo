const AppError = require("./AppError");

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedError;