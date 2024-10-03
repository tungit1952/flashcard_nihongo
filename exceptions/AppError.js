class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Tên của lớp lỗi
        Error.captureStackTrace(this, this.constructor); // Lưu lại stack trace
    }
}

module.exports = AppError;
