'use strict';

const Product = require('../models/product.js');

function getProducts (req, res) {
	Product.find({}, (err, products) => {
		if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`);
		if (!products) return res.status(404).send({ message: 'No existen productos aún.' });
		
		res.status(200).send({ products });
	});
}

function getProduct (req, res) {
	let productId = req.params.productId;

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`);
		if (!product) return res.status(404).send({ message: 'El producto no existe.' });

		res.status(200).send({ product });
	});
}
function createProduct (req, res) {
	let product = new Product();

	product.name = req.body.name;
	product.picture = req.body.picture;
	product.price = req.body.price;
	product.category = req.body.category;
	product.description = req.body.description;

	product.save((err, productStored) => {
		if (err) res.status(500).send({ message: `Error al guardar el producto: ${err}` });
		
		res.status(200).send( { producto: productStored });
	});
}

function updateProduct (req, res) {
	let productId = req.params.productId;
	let update = req.body;

	Product.findByIdAndUpdate(productId, update,(err, productUpdated) => {
		if (err) return res.status(500).send(`Error al actualizar el producto: ${err}`);
		
		res.status(200).send({ producto: productUpdated });
	});
}

function deleteProduct (req, res) {
	let productId = req.params.productId;

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`);
		if (!product) return res.status(404).send({ message: 'El producto no existe.' });
		
		product.remove(err => {
			if (err) return res.status(500).send(`Error al eliminar el producto: ${err}`);
			
			res.status(200).send({ product });
		});
	});
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
}