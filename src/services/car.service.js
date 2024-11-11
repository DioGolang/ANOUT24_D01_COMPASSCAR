const CarRepository = require('../infra/repositories/car.repository');
const CarException = require('../domain/exceptions/Car.exception');
const { validateCarFields } = require('../validators/car.validator');

const CarService = {
	async getAll(filters) {
		try {
			return await CarRepository.findAll(filters);
		} catch (error) {
			console.error('Error finding cars:', error.message);
			throw error;
		}
	},

	async getById(id) {
		try {
			return await CarRepository.findByIdWithItems(id);
		} catch (error) {
			console.error('Error finding car by id:', error.message);
			throw error;
		}
	},

	async getByPlate(plate) {
		try {
			return await CarRepository.findByPlate(plate);
		} catch (error) {
			console.error('Error finding car by plate:', error.message);
			throw error;
		}
	},
	async create(car) {
		const existingCars = await CarRepository.findByPlate();
		console.log('existingCars', existingCars);
		const validationErrors = validateCarFields(car, existingCars);

		if (validationErrors.length > 0) {
			throw new CarException(validationErrors.join(', '), 400, 'VALIDATION_ERROR');
		}
		try {
			return await CarRepository.create(car);
		} catch (error) {
			console.error('Error creating car:', error.message);
			throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
		}
	},
	async update(id, car) {
		try {
			console.log('SERVICE', car);
			return await CarRepository.update(id, car);
		} catch (error) {
			console.error('Error updating car:', error.message);
			throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
		}
	},
	async delete(id) {
		try {
			return await CarRepository.delete(id);
		} catch (error) {
			console.error('Error deleting car:', error.message);
			throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
		}
	},
};
module.exports = CarService;
