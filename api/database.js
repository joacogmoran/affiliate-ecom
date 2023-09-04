const sequelize = require('sequelize');
require('dotenv').config();

// env
const {DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const database = new sequelize(
    DB_DATABASE, DB_USER, DB_PASSWORD, {
        host: DB_HOST, dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    }
)

module.exports = database;
