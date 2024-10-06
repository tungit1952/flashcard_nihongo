const jwt = require('jsonwebtoken');

const authMiddleware = {
    validateToken: async (request, response, next) => {
        const token = request.cookies.token;
        if (!token) {
            return response.redirect('/login');
        }
        try {
            request.user = jwt.verify(token, process.env.SECRET_KEY);
            next();
        } catch (error) {
            return response.redirect('/login');
        }
    }
};

module.exports = authMiddleware;