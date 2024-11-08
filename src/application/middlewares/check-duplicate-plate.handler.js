const CarService = require('../../services/car.service');
const CarException = require('../../domain/exceptions/Car.exception');

const checkDuplicatePlateHandler = async (req, res, next) => {
	try {
		const { plate } = req.body;
		const car = await CarService.getByPlate(plate);
		console.log('car', car);
		if (car) {
			throw new CarException('Car already registered', 409);
		}
		next();
	} catch (error) {
		next(error);
	}
};
module.exports = checkDuplicatePlateHandler;
