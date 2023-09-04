const express = require('express');

// middlewares
const authenticationRequired = require('../../../../middlewares/auth/userAuth/required');

// constorllers
const { getUserData, editUserData } = require('../../../../controllers/user/data/controller');


const route = express.Router();
route.get('/get/user/data/:username', getUserData);
route.put('/edit/user/data', authenticationRequired, editUserData);


module.exports = route;