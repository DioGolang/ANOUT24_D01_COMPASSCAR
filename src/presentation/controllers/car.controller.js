const CarService = require('../../services/car.service');
const CarsService = require('../../domain/service/car.service');
const CarException = require('../../domain/exceptions/Car.exception');
const CarsDto = require('../../application/dto/cars.dto');
const CarsResponseDTO = require('../../application/dto/cars.reponse.dto');

const CarController = {
	async create(req, res, next) {
		try {
			// const carsDto = new CarsDto(req.body);
			// carsDto.validate();
			// const car = await CarsService.create(carsDto);
			// const carResponse = new CarsResponseDTO(car);
			// res.status(201).json(carResponse.toObject());
			const car = await CarService.create(req.body);
			const carResponse = new CarsResponseDTO(car);
			res.status(201).json(carResponse.toObject());
		} catch (error) {
			next(error);
		}
	},
	async getAll(req, res, next) {
		try {
			const filters = req.query;
			const cars = await CarService.getAll(filters);
			res.status(200).json(cars);
		} catch (error) {
			next(error);
		}
	},
	async getById(req, res, next) {
		try {
			const { id } = req.params;
			const car = await CarService.getById(id);
			res.status(200).json(car);
		} catch (error) {
			next(error);
		}
	},
	async update(req, res, next) {
		try {
			const { id } = req.params;
			const car = await CarService.update(id, req.body);
			res.status(200).json(car);
		} catch (error) {
			next(error);
		}
	},
	async delete(req, res, next) {
		try {
			const { id } = req.params;
			await CarService.delete(id);
			res.status(204).end();
		} catch (error) {
			next(error);
		}
	},
};
module.exports = CarController;
