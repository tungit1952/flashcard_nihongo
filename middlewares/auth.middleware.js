const jwt = require('jsonwebtoken');

const authMiddleware = {
    validateToken: async (request, response, next) => {
        const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Không có quyền truy cập!' });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            request.user = decoded;
            next();
        } catch (error) {
            return response.status(400).json({ message: 'Không có quyền truy cập!' });
        }
    }
};

module.exports = authMiddleware;