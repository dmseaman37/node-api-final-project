const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const Piece = require('./models/piece');
let app = express();

app.use(bodyParser.json());

app.get('/api/pieces', function(request, response) {
	Piece.findAll().then((pieces) => {
		response.json(pieces);
	});
});

app.get('/api/pieces/:id', function(request, response) {
	let { id } = request.params;

	Piece.findByPk(id).then((piece) => {
		if (piece) {
			response.json(piece);
		} else {
			response.status(404).send();
		}
	});
});

app.delete('/api/pieces/:id', function(request, response) {
	let { id } = request.params;

	Piece
		.findByPk(id)
		.then((piece) => {
			if (piece) {
				return piece.destroy();
			} else {
				return Promise.reject();
			}
		})
		.then(() => {
			response.status(204).send();
		}, () => {
			response.status(404).send();
		});
});

app.patch('/api/pieces/:id', function(request, response) {
	let { id } = request.params;

	Piece.findByPk(id).then((piece) => {
		if (piece) {
			piece.update({
				composer: request.body.composer,
				title: request.body.title
			})
			.then((piece) => {
				response.json(piece);
			}, (validation) => {
				response.status(422).json({
					errors: validation.errors.map((error) => {
						return {
							attribute: error.path,
							message: error.message
						};
					})
				});
			});
		} else {
			response.status(404).send();
		}
	});
});

app.post('/api/pieces', function(request, response) {
	Piece
	.create({
		composer: request.body.composer,
		title: request.body.title,
		category: request.body.category
	})
	.then((piece) => {
		response.json(piece);
	}, (validation) => {
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				};
			})
		});
	});
});

app.listen(8000);