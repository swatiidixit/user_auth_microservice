const dotenv = require('dotenv').config();

exports.db_config = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect
}

exports.EXPRESS_PORT = process.env.PORT || 5000;