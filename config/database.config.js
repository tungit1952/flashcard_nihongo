const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const dbURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB đã ok'))
    .catch(err => console.error('MongoDB tịt:', err));
module.exports = mongoose