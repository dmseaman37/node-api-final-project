const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('piece', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	composer: {
		field: 'composer',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: "Composer is required"
			}
		}
	},

	title: {
		field: 'title',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: "Title is required"
			}
		}
	},

	category: {
		field: 'category_id',
		type: Sequelize.INTEGER,
		validate: {
			notEmpty: {
				args: true,
				msg: "Category is required"
			}
		}
	}
}, {
	timestamps: false
});