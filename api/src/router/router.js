const express = require('express');
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/routes');



const router = express.Router();
router.use(authRoutes);
router.use(userRoutes);



module.exports = router;