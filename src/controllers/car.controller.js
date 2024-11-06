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
  }
}
module.exports = CarController;