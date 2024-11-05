const CarModel = require('../models/car.model');

const CarService = {
  async create(car) {
    try {
      return await CarModel.create(car);
    } catch (error) {
      console.error('Error creating car:', error.message);
      throw error;
    }
  }
}

module.exports = CarService;