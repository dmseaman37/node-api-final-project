const frisby = require('frisby');

const { Joi } = frisby;

//---------------------------------------------------------------------------------------------------
// Get endpoint (individual resource) unit tests
//---------------------------------------------------------------------------------------------------

it('should return a status code of 404 when it tries to return a piece that does not exist', () => {
	return frisby
	.get('http://localhost:8000/api/pieces/-1')
	.expect('status', 404);
});

it('should return a status code of 200 when an existing piece is requested', () => {
	return frisby
	.get('http://localhost:8000/api/pieces/2')
	.expect('status', 200)
	.expect('json', 'id', 2)
	.expect('json', 'composer', 'Wolfgang A. Mozart')
	.expect('json', 'title', 'Flute Concerto No. 2 in D Major')
	.expect('json', 'category', 1);
});

//---------------------------------------------------------------------------------------------------
// Get endpoint (collection of resources) unit tests
//---------------------------------------------------------------------------------------------------

it('should return a status code of 200 when all pieces are requested', () => {
	return frisby
	.get('http://localhost:8000/api/pieces')
	.expect('status', 200)
	.expect('jsonTypes', '*', {
		id: Joi.number().required(),
		composer: Joi.string().required(),
		title: Joi.string().required(),
		category: Joi.number().required()
	});
})

//---------------------------------------------------------------------------------------------------
// Post endpoint unit tests
//---------------------------------------------------------------------------------------------------

it('should return a status code of 200 when a piece is added successfully', () => {
	return frisby
	.post('http://localhost:8000/api/pieces', {
		composer: 'a composer',
		title: 'a title',
		category: 1
	})
	.expect('status', 200)
	.expect('json', 'composer', 'a composer')
	.expect('json', 'title', 'a title')
	.expect('json', 'category', 1);
});

it('should return a status of 422 when there are validation errors', () => {
	return frisby
	.post('http://localhost:8000/api/pieces', {
		composer: '',
		title: '',
		category: ''
	})
	.expect('status', 422)
	.expect('json', 'errors', [
		{
			"attribute": "composer",
			"message": "Composer is required"
		}, {
			"attribute":"title",
			"message":"Title is required"
		}, {
			"attribute":"category",
			"message":"Category is required"
		}
	]);
});

//---------------------------------------------------------------------------------------------------
// Delete endpoint unit tests
//---------------------------------------------------------------------------------------------------

it('should return a 404 error when deleting a piece that does not exist', () => {
	return frisby
	.delete('http://localhost:8000/api/pieces/-1')
	.expect('status', 404);
});

it('should return a 204 error when deleting an existing piece', () => {
	return frisby
	.delete('http://localhost:8000/api/pieces/5')
	.expect('status', 204);
});

//---------------------------------------------------------------------------------------------------
// Patch endpoint unit tests
//---------------------------------------------------------------------------------------------------

it('should return a status code of 404 when it tries to edit a piece that does not exist', () => {
	return frisby
	.patch('http://localhost:8000/api/pieces/-1', {
		composer: 'new composer',
		title: 'new title'
	})
	.expect('status', 404);
});

it('should return a status code of 200 when an existing piece is updated', () => {
	return frisby
	.patch('http://localhost:8000/api/pieces/2', {
		composer: 'new composer',
		title: 'new title'
	})
	.expect('status', 200)
	.expect('json', 'composer', 'new composer')
	.expect('json', 'title', 'new title');
});

it('should return a status of 422 when there are validation errors', () => {
	return frisby
	.patch('http://localhost:8000/api/pieces/2', {
		composer: '',
		title: ''
	})
	.expect('status', 422)
	.expect('json', 'errors', [
		{
			"attribute":"composer",
			"message":"Composer is required"
		}, {
			"attribute":"title",
			"message":"Title is required"
		}
	]);
});






