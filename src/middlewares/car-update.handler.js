const CarException = require('../errors/car.exception');
const { validatePlate, validateYear } = require('../validators/car.validator');

const carUpdateHandler = async (req, res, next) => {
  try {
    const { plate, year, model, brand } = req.body;
    const errors = [];

    console.log('plate', plate);
    console.log('year', year);
    console.log('model', model);
    console.log('brand', brand);


    if (plate !== undefined && !validatePlate(plate)) {
      errors.push('plate must be in the correct format ABC-1C34');
    }

    if (year !== undefined && !validateYear(year)) {
      errors.push(`year must be between ${new Date().getFullYear() - 10} and ${new Date().getFullYear()}`);
      console.log(errors);
    }

    if(brand !== undefined && model === undefined) {
      errors.push('model must also be informed');
    }

    if (errors.length > 0) {
      throw new CarException(errors.join(', '), 400, 'VALIDATION_ERROR');
    }

  } catch (error) {
    next(error);
  }
}
module.exports = carUpdateHandler;