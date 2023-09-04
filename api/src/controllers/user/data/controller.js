const Users = require("../../../models/Users/model");



module.exports = {

    getUserData: async (req, res) => {
        const {username} = req.params
        if (!username) return res.sendStatus(400);
        const user = await Users.findOne({
            where: {username}, attributes: ['imageUrl', 'username', 'description']
        });
        if (!user) return res.sendStatus(404);
        res.status(200).send(user);
    },

    editUserData: async (req, res) => {
        const { imageUrl, name, username, description, link } = req.body;
        const user = await Users.findByPk(req.id);
        if (!user) return res.sendStatus(204);

        if (imageUrl && imageUrl.length) user.imageUrl = imageUrl;
        if (name && (name.length >= 3 && name.length < 15)) user.name = name;
        if (username && (username.length > 3 && username.length < 20)) user.username = username;
        if (description && (description.length > 5 && description.length < 300)) user.description = description;
        if (link && link.length) user.link = link;

        await user.save();
        res.sendStatus(200);
    },

};