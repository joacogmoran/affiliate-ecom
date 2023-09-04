const bcrypt = require('bcrypt');
const Users = require('../../../models/Users/model');


module.exports = signup = async (req, res) => {
    // recived data

    console.log('aaaa')

    const {username, password} = req.body;
    if (!username || !password) return res.sendStatus(400);
    // valid?
    if (!username.length && (username.length < 3 || username.length > 20)) return res.sendStatus(400);
    if (!password.length && (password.length < 5 || password.length > 30)) return res.sendStatus(400);
    // check if user exist
    const user = await Users.findOne({ where: { username } });
    if (user) return res.sendStatus(204);
    try {
        // hashs password
        const hashedPassword = await bcrypt.hash(password, 10); 
        await Users.create({ username, password: hashedPassword });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }
};