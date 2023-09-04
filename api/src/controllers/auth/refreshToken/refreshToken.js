const jwt = require('jsonwebtoken');
const Users = require("../../../models/Users/model");



module.exports = refreshToken = async (req, res) => {
    // checks if there is a cookie - jwt
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(400);
    const refreshToken = cookie.jwt;
    // search the user - that has that refreshToken
    const user = await Users.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(204);
    // verify
    jwt.verify(
        refreshToken, process.env.SECRET_REFRESH_TOKEN,
        (error, decoded) => {
            if (error) return res.sendStatus(401);
            const userData = { id: decoded.id };
            let accessToken = jwt.sign({ 'data': userData }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '30s' });
            return res.status(200).send({ accessToken, username: user.username, role: user.role});
        }
    );
};