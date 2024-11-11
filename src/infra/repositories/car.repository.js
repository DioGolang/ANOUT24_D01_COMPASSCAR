const dbConnection = require('../../utils/db');
const CarException = require('../../domain/exceptions/Car.exception');

const CarRepository = {
	async findAll(filters = {}) {
		const connection = await dbConnection();
		try {
			let { year, final_place, brand, limit = 5, page = 1 } = filters;
			const conditions = [];
			const params = [];

			page = Math.max(1, parseInt(page));
			limit = Math.min(Math.max(1, parseInt(limit)), 10);

			if (year) {
				conditions.push('year = ?');
				params.push(year);
			}
			if (final_place) {
				conditions.push('plate LIKE ?');
				params.push(`%${final_place}`);
			}
			if (brand) {
				conditions.push('brand LIKE ?');
				params.push(`%${brand}%`);
			}

			const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
			const offset = (page - 1) * limit;

			const [cars] = await connection.query(`SELECT * FROM cars ${whereClause} LIMIT ? OFFSET ?`, [...params, limit, offset]);

			const [countResult] = await connection.query(`SELECT COUNT(*) as count FROM cars ${whereClause}`, params);

			const total = countResult[0].count;
			const pages = Math.ceil(total / limit);

			return { count: total, pages, data: cars };
		} catch (error) {
			console.error('Error fetching cars:', error.message);
			throw new CarException('Failed to fetch cars', 500);
		} finally {
			connection.end();
		}
	},

	async findById(id) {
		const connection = await dbConnection();
		try {
			const [rows] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
			return rows[0] || null;
		} catch (error) {
			console.error('Error fetching car by id:', error.message);
			throw new CarException('Car not found', 404);
		} finally {
			connection.end();
		}
	},

	async findByIdWithItems(id) {
		const connection = await dbConnection();
		try {
			const [rows] = await connection.query(
				`SELECT cars.*, COALESCE(cars_items.name, '') as item_name 
				FROM cars 
				LEFT JOIN cars_items ON cars.id = cars_items.car_id 
				WHERE cars.id = ?`,
				[id],
			);

			if (!rows.length) throw new CarException('Car not found', 404);

			const car = {
				id: rows[0].id,
				brand: rows[0].brand,
				model: rows[0].model,
				year: rows[0].year,
				plate: rows[0].plate,
				created_at: rows[0].created_at,
				items: rows.map((row) => row.item_name).filter((item) => item),
			};
			return car;
		} catch (error) {
			console.error('Error fetching car with items:', error.message);
			throw error;
		} finally {
			connection.end();
		}
	},

	async findByPlate(plate) {
		const connection = await dbConnection();
		try {
			const [rows] = await connection.query('SELECT * FROM cars WHERE plate = ?', [plate]);
			return rows[0] || null;
		} catch (error) {
			console.error('Error fetching car by plate:', error.message);
			throw new CarException('Car not found by plate', 404);
		} finally {
			connection.end();
		}
	},

	async create(car) {
		console.log('REPOSITORY', car);
		const connection = await dbConnection();
		try {
			const [result] = await connection.query(`INSERT INTO cars (brand, model, year, plate) VALUES (?, ?, ?, ?)`, [
				car.brand,
				car.model,
				car.year,
				car.plate,
			]);
			return await this.findById(result.insertId);
		} catch (error) {
			console.error('Error creating car:', error.message);
			throw new CarException('Failed to create car', 500);
		} finally {
			connection.end();
		}
	},

	async update(id, car) {
		const connection = await dbConnection();
		try {
			const fields = [];
			const values = [];

			if (car.brand) fields.push('brand = ?'), values.push(car.brand);
			if (car.model) fields.push('model = ?'), values.push(car.model);
			if (car.year) fields.push('year = ?'), values.push(car.year);
			if (car.plate) fields.push('plate = ?'), values.push(car.plate);

			if (!fields.length) throw new CarException('No fields to update', 400);

			values.push(id);
			const query = `UPDATE cars SET ${fields.join(', ')} WHERE id = ?`;
			await connection.query(query, values);

			return await this.findById(id);
		} catch (error) {
			console.error('Error updating car:', error.message);
			throw new CarException('Failed to update car', 500);
		} finally {
			connection.end();
		}
	},

	async delete(id) {
		const connection = await dbConnection();
		try {
			await connection.beginTransaction();
			await connection.query('DELETE FROM cars_items WHERE car_id = ?', [id]);

			const [result] = await connection.query('DELETE FROM cars WHERE id = ?', [id]);

			if (result.affectedRows === 0) {
				throw new CarException('Car not found for deletion', 404);
			}

			await connection.commit();
		} catch (error) {
			await connection.rollback();
			console.error('Error deleting car:', error.message);
			throw new CarException('Failed to delete car', 500);
		} finally {
			connection.end();
		}
	},
};
module.exports = CarRepository;
