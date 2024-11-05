const CarService = require('../services/car.service');
const CarException = require('../errors/car.exception');

const CarController = {
  async create(req, res, next) {
    try {
      const car = await CarService.create(req.body);
      res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CarController;