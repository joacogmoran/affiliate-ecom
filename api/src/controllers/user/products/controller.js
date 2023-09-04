const Products = require("../../../models/Products/model");
const Users = require("../../../models/Users/model");






module.exports = {

    getUserProducts: async (req, res) => {
        const {username} = req.params;
        if (!username?.length) return res.sendStatus(400);
        
        const user = await Users.findOne({
            where: { username }, include: [Products]
        });

        if (!user) return res.sendStatus(404);
        res.status(200).send(user.Products);
    },

    getUserProductDetail: async (req, res) => {
        const {productId} = req.params;
        if (!productId) return res.sendStatus(400);
        const product = await Products.findByPk(productId);
        if (!product) return res.sendStatus(404);
        res.status(200).send(product);
    },


    createProduct: async (req, res) => {
        const {imageUrl, name, category, shortDesc, description, link} = req.body;
        if (!imageUrl || !name || !category || !shortDesc || !description || !link) return res.sendStatus(400);
        
        const categories = ['home', 'travel', 'tech', 'game', 'book', 'cloth', 'collection'];

        if (name.length < 3 || name.length > 15) return res.sendStatus(400);
        if (shortDesc.length < 10 || shortDesc.length > 40) return res.sendStatus(400);
        if (description.length < 50 || description.length > 300) return res.sendStatus(400);
        if (!categories.includes(category)) return res.sendStatus(400);
        
        try {
            await Products.create({
                imageUrl, name, category,
                shortDesc, description, link,
                UserId: req.id
            });
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    },

    editProduct: async (req, res) => {
        const {productId} = req.params;
        if (!productId) return res.sendStatus(400);

        const { imageUrl, name, category, shortDesc, description, link } = req.body;
        if (!imageUrl && !name && !category && !description && !link) return res.sendStatus(400);
        
        const categories = [
            'bedroom', 'bathroom', 'playroom',
            'livingroom', 'kitchen', 'garden',
            'outdoor', 'car'
        ];

        const product = await Products.findByPk(productId);
        if (!product) return res.sendStatus(204);

        if (imageUrl && imageUrl.length) product.imageUrl = imageUrl;
        if (name && (name.length > 3 || name.length < 15)) product.name = name;
        if (shortDesc && (shortDesc.length >= 10 || shortDesc.length <= 40)) product.shortDesc = shortDesc;
        if (description && (description.length >= 50 || description.length <= 300)) product.description = description;
        if (category && !categories.includes(category)) product.category = category;
        if (link && link.length) product.link = link;

        await product.save();
        res.sendStatus(200);
    },

    deleteProduct: async (req, res) => {
        const {productId} = req.params;
        if (!productId) return res.sendStatus(400);

        const product = await Products.findByPk(productId);
        if (!product) return res.sendStatus(204);

        await product.destroy();
        res.sendStatus(200);
    },

};