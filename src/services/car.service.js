const CarModel = require('../models/car.model');
const CarException = require('../errors/car.exception');
const { validateCarFields } = require('../validators/car.validator');

const CarService = {

  async getAll() {
    try {
      return await CarModel.findAll();
    } catch (error) {
      console.error('Error finding cars:', error.message);
      throw error;
    }
  },

  async getByPlate(plate) {
    try {
      return await CarModel.findByPlate(plate);
    } catch (error) {
      console.error('Error finding car by plate:', error.message);
      throw error;
    }
  },
  async create(car) {
    const existingCars = await CarModel.findAll();
    const validationErrors = validateCarFields(car, existingCars);

    if (validationErrors.length > 0) {
      throw new CarException(validationErrors.join(', '), 400, 'VALIDATION_ERROR');
    }
    try {
      return await CarModel.create(car);
    } catch (error) {
      console.error('Error creating car:', error.message);
      throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
    }
  }
};
module.exports = CarService;