'use strict';

const mongoose = require('mongoose');
const app = require('./app.js');
const config = require('./config.js');

mongoose.connect(config.DB, (err,res) => {
	if (err) {
		return console.log(`Error al conectar con la base de datos: ${err}`);
	}

	console.log('Conexión con la base de datos establecida.');

	app.listen(config.PORT, () => {
		console.log(`Servidor corriendo en localhost:${config.PORT}...`);
	});
});




/* Example Request GET
app.get('/hola/:name', (req, res) => {
	res.send({ message: `Hola ${req.params.name}!` });
});
*/