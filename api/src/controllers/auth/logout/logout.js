const Users = require("../../../models/Users/model");



module.exports = logout = async (req, res) => {
    // check if there is a cookie
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(400)
    // look for respected user who has this refreshtoken
    const user = await Users.findOne({ where: { refreshToken: cookie.jwt } });
    // if there is no user, clearCookie
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(200);
    }
    // if there is, empty cookie in the db and clearCookie
    user.refreshToken = '';
    await user.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(200);
};