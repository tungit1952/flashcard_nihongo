const AuthService = require('../../services/auth.service')
const authController = {
    register: async (request, response, next) => {
        try {
            console.log(request.body)
            const user = await AuthService.register(request.body)
            response.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },
    login: async (request, response, next) => {
        try {
            const { token, user } = await AuthService.login(request.body);
            response.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            response.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = authController