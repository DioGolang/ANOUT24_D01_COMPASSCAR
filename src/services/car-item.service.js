const CarItemModel = require('../infra/repositories/car-item.repository');
const { validateItems } = require('../validators/item.validator');
const CarException = require('../domain/exceptions/Car.exception');

const CarItemService = {

  async create(items, carId) {
    const errors = validateItems(items);

    if (errors.length > 0) {
      throw new CarException(errors.join(', '), 400, 'VALIDATION_ERROR');
    }
    try {
      return await CarItemModel.create(items, carId);
    } catch (error) {
      throw new CarException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
    }
  }
}
module.exports = CarItemService;
