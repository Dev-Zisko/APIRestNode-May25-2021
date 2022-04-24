'use strict';

const express = require('express');
const ProductController = require('../controllers/product.js');
const UserController = require('../controllers/user.js');
const auth = require('../middlewares/auth.js');
const api = express.Router();

api.get('/product', ProductController.getProducts);
api.get('/product/:productId', ProductController.getProduct);
api.post('/product', auth, ProductController.createProduct);
api.put('/product/:productId', auth, ProductController.updateProduct);
api.delete('/product/:productId', auth, ProductController.deleteProduct);
api.post('/signup', UserController.signUp);
api.post('/signin', UserController.signIn);
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: 'Tienes los permisos necesarios.' });
});

module.exports = api;