const clientController = {
    login: async (request, response, next) => {
        response.render('login', { title: 'Đăng nhập', layout: false });
    },
    home: async (request, response, next) => {
        response.render('home', { title: 'Trang chủ' });
    },
    vocabulary: async (request, response, next) => {
        response.render('vocabulary/index', { title: 'Từ vựng' });
    },

}
module.exports = clientController