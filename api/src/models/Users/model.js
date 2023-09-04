const database = require('../../../database');
const { DataTypes } = require('sequelize');

// models
const Products = require('../Products/model');

// model
module.exports = Users = database.define(
    'User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        imageUrl: {
            type: DataTypes.JSON,
            defaultValue: '',
            notNull: true,
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            len: [3, 15]
        },
        username: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            len: [3, 20]
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            len: [5, 30]
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            len: [5, 300]
        },
        refreshToken: {
            type: DataTypes.STRING
        }
    }
);

// assosiations

// many to one
Users.hasMany(Products);
Products.belongsTo(Users);