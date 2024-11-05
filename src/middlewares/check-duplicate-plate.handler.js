const CarService = require('../services/car.service');
const CarException = require('../errors/car.exception');

const checkDuplicatePlate = async (req, res, next) => {
  try {
    const { plate } = req.body;
    const car = await CarService.getByPlate(plate);
    if (car) {
      throw new CarException('Car already registered', 409);
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = checkDuplicatePlate;