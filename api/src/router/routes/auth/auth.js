const express = require('express');

// middlewares
const authenticationRequired = require('../../../middlewares/auth/userAuth/required');

// controllers
const signup = require('../../../controllers/auth/signup/signup');
const login = require('../../../controllers/auth/login/login');
const logout = require('../../../controllers/auth/logout/logout');
const refreshToken = require('../../../controllers/auth/refreshToken/refreshToken');



const route = express.Router();

// POST
route.post('/user/signup', signup);
route.post('/user/login', login);

// GET
route.get('/user/refreshtoken', authenticationRequired, refreshToken);
route.get('/user/logout', authenticationRequired, logout);


module.exports = route;