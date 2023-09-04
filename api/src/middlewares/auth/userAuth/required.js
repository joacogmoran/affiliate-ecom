const jwt = require('jsonwebtoken');


module.exports = isAuthenticated = (req, res, next) => {
    // cookie?
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(400);
    const token = cookie.jwt;
    // verify the token's validity
    jwt.verify(
        token, process.env.SECRET_REFRESH_TOKEN,
        (error, decoded) => {
            if (error) return res.sendStatus(401);
            req.id = decoded.data.id;
            next();
        }
    );
};