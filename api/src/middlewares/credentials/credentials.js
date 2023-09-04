const { allowedOrigins } = require('../../config/corsOptions/corsOptions');


// allows credentials in cross-origin requests - cookies http auth
module.exports = credentials = (req, res, next) => {
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) res.header('Access-Control-Allow-Credentials', true);
        next();
};