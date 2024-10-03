const {ValidationError} = require("../exceptions");
const User = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService =  {
    async register(body) {
        const {name, username, password} = body
        if (!username || !password || !name) throw new ValidationError('Vui lòng nhập đầy đủ thông tin!.');

        const exitUses = await User.findOne({username});
        if (exitUses) throw new ValidationError('Tài khoản đã tồn tại!.');

        const hashPassword = await this.hashPassword(password)

        const newUser = new User({name, username, password: hashPassword});
        await newUser.save();
        return newUser;
    },
    async hashPassword(password){
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds);
    },
    async login(body) {
        const {username, password} = body;
        if (!username || !password) throw new ValidationError('Vui lòng nhập tên người dùng và mật khẩu!');

        const user = await User.findOne({username});
        if (!user) throw new ValidationError('Tài khoản không tồn tại!');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ValidationError('Mật khẩu không chính xác!');

        const token = this.generateToken(user._id, user.username);

        const {password: userPassword, ...resultUser} = user.toObject();

        return {token, user: resultUser};
    },
    generateToken(userId, username) {
        const payload = { id: userId, username };
        const secret = process.env.SECRET_KEY;
        return jwt.sign(payload, secret);
    }
}

module.exports = AuthService