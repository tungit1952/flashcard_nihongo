require('dotenv').config();
require('./config/database.config');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const clientRoutes = require('./routes/client.routes');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const { engine } = require('express-handlebars');
const {resolve} = require("path");


const base_api_prefix = process.env.BASE_API_PREFIX
const PORT = process.env.PORT || 3000;
const app = express();

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use(`/`, clientRoutes);
app.use(`/${base_api_prefix}`, routes);
app.listen(PORT, () => {
    console.log(`Đang chạy ở http://localhost:${PORT}`);
});