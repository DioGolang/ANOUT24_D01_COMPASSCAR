const CarItemModel = require('../infra/repositories/car-item.repository');
const { validateItems } = require('../validators/item.validator');
const CarException = require('../domain/exceptions/Car.exception');
const dbConnection = require('../utils/db');

const CarItemService = {
	async create(items, carId) {
		const name = items.join(', ');
		const errors = validateItems([{ name }]);
		if (errors.length > 0) {
			throw new CarException(errors.join(', '), 400, 'VALIDATION_ERROR');
		}

		try {
			const existingItem = await this.findByNameAndCarId(carId);
			console.log('Existing Item:', existingItem);

			if (existingItem) {
				return await this.update(existingItem.id, name);
			} else {
				return await this.createItem(name, carId);
			}
		} catch (error) {
			console.error('Error creating or updating car items:', error);
			throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
		}
	},

	async findByNameAndCarId(carId) {
		const connection = await dbConnection();
		const [rows] = await connection.query('SELECT * FROM cars_items WHERE car_id = ?', [carId]);
		connection.end();
		console.log('Rows Found:', rows);
		return rows[0] || null;
	},

	async update(id, name) {
		const connection = await dbConnection();
		const [result] = await connection.query('UPDATE cars_items SET name = ? WHERE id = ?', [name, id]);
		console.log('Update Result:', result);
		connection.end();
		return { id, name };
	},

	async createItem(name, carId) {
		const connection = await dbConnection();
		const [result] = await connection.query('INSERT INTO cars_items (name, car_id) VALUES (?, ?)', [name, carId]);
		connection.end();
		return { id: result.insertId, name };
	},
};
module.exports = CarItemService;
