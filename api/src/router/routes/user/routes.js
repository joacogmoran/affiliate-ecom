const express = require('express');
const userData = require('./data/data');
const userProducts = require('./products/products');


const route = express.Router();
route.use(userData);
route.use(userProducts)


module.exports = route;