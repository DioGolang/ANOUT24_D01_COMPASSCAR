const Car = require('../entities/Car.entity');
//const CarException = require('../exceptions/Car.exception');
const CarRepository = require('../../infra/repositories/car.repository');

class CarService {
	static async create(carsDto) {
		const car = new Car(carsDto);
		// const existingCars = await CarRepository.findByPlate(carsDto.plate);
		// console.log('existingCars', existingCars);
		// car.validateCar(existingCars);
		return await CarRepository.create(car.toData());
	}
}

module.exports = CarService;
