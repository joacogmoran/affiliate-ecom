const database = require('../../../database');
const { DataTypes } = require('sequelize');


// model
module.exports = Products = database.define(
    'Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        imageUrl: {
            type: DataTypes.JSON,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
            len: [3, 15]
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
            isIn: [[
                'home', 'travel', 'tech', 'game',
                'book', 'cloth', 'collection'
            ]]
        },
        shortDesc: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
            len: [10, 40]
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
            len: [50, 300]
        },
        link: {
            type: DataTypes.JSON,
            defaultValue: '',
            notNull: true,
            notEmpty: '',
        },
    }
);
