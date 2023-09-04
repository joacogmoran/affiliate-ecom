const express = require('express');

// middlewares
const authenticationRequired = require('../../../../middlewares/auth/userAuth/required');

// constorllers
const {
    getUserProducts, getUserProductDetail,
    createProduct, editProduct, deleteProduct
} = require('../../../../controllers/user/products/controller');



const route = express.Router();
route.get('/get/user/products/:username', getUserProducts);
route.get('/get/user/product/details/:productId', getUserProductDetail);
route.post('/create/user/product', authenticationRequired, createProduct);
route.put('/edit/user/product/:productId', authenticationRequired, editProduct);
route.delete('/delete/user/product/:productId', authenticationRequired, deleteProduct);



module.exports = route;