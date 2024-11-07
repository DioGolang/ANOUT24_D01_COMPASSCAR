const Car = require('../../infra/repositories/car.repository');
const CarException = require('../../domain/exceptions/Car.exception');

const carNotFoundHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      throw new CarException('car not found', 404);
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = carNotFoundHandler;