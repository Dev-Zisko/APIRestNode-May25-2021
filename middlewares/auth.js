'use strict';

const services = require('../services/index.js');

function isAuth (req, res, next) {
	if(!req.headers.authorization) {
		return res.status(403).send({ message: 'No tienes los permisos necesarios.' });
	}

	const token = req.headers.authorization.split(' ')[1];
	
	services.decodeToken(token)
		.then(response => {
			req.user = response;
			next();
		})
		.catch(response => {
			res.status(response.status).send(response.message);
		});
}

module.exports = isAuth;