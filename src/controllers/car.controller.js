const CarService = require('../services/car.service');

const CarController = {
  async create(req, res) {
    try {
      const car = await CarService.create(req.body);
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
}
module.exports = CarController;