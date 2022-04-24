'user strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');

function createToken (user) {
	const payload = {
		sub: user._id, // Deberia hacerse un metodo para cambiar ese id por otro para no pasarlo así y tener posibles riesgos de seguridad
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken (token) {
	const decoded = new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN);

			if (payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'El token ha expirado'
				});
			}

			resolve(payload.sub);
		} catch (err) {
			reject({
				status: 500,
				message: 'Token invalido'
			});
		}
	});

	return decoded;
}

module.exports = {
	createToken,
	decodeToken
}