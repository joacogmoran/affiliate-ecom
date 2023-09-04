const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../../../models/Users/model");


module.exports = login = async (req, res) => {
    // data is recived
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    // check if username exist
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.sendStatus(204);
    // check if password is ok
    const passwordIsOk = await bcrypt.compare(password, user.password);
    if (!passwordIsOk) return res.sendStatus(401);
    // create access and refresh token (pass data)
    const userData = { id: user.id };
    let accessToken = jwt.sign({ "data": userData }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '30s' });
    let refreshToken = jwt.sign({ "data": userData }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '1d' });
    // save refresh token in user
    user.refreshToken = refreshToken;
    await user.save()
    // send refresh token cookie and access token - ok
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).send({ accessToken, username: user.username, role: user.role});
};