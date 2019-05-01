const { expect } = require('chai');
const Piece = require('./../../../models/piece');

describe('piece', () => {
	describe('composer', () => {
		it('should fail validation when empty', async () => {
			try {
				let piece = new Piece({composer: 'hello', title: 'new', category: 1});
				await piece.validate();
			}

			catch (error) {
				expect(error.errors[0].message).to.equal('Composer is required');
			}
		});

		it('should pass validation when it contains a string', async () => {
			let piece = new Piece({composer: 'new', title: 'new', category: 1});
			await piece.validate();
		});
	});

	describe('title', () => {
		it('should fail validation when empty', async () => {
			try {
				let piece = new Piece({composer: 'hello', title: '', category: 1});
				await piece.validate();
			}

			catch (error) {
				expect(error.errors[0].message).to.equal('Title is required');
			}
		});
		it('should pass validation when it contains a string', async () => {
			let piece = new Piece({composer: 'new', title: 'new', category: 1});
			await piece.validate();
		});
	});

	describe('category', () => {
		it('should pass validation when it contains a number', async () => {
			let piece = new Piece({composer: 'new', title: 'new', category: 1});
			await piece.validate();
		});
	});
});