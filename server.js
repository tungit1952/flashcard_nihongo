require('dotenv').config();
require('./config/database.config');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');


const base_api_prefix = process.env.BASE_API_PREFIX
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(`/${base_api_prefix}`, routes);
app.listen(PORT, () => {
    console.log(`Đang chạy ở http://localhost:${PORT}`);
});