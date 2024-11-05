
function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

function duplicatePlate(plate, cars) {
  return cars.some(car => car.plate === plate);
}

function validatePlate(plate) {
  if(plate.length !== 8) {
    return false;
  }

  for (let i = 0; i < 3; i++) {
    if (!isLetter(plate[i])) {
      return false;
    }
  }

  if (plate.charAt(3) !== '-') {
    return false;
  }

  if (!isNumber(plate.charAt(4))) {
    return false;
  }

  if (!isLetter(plate.charAt(5))) {
    return false;
  }
  return !(!isNumber(plate.charAt(6)) || !isNumber(plate.charAt(7)));
}

function isLetter(char) {
  return char >= 'A' && char <= 'Z';
}

function isNumber(char) {
  return char >= '0' && char <= '9';
}

function validateYear(year) {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 10;
  const maxYear = currentYear + 10;
  return year >= minYear && year <= maxYear && year <= currentYear;
}

function validateRequired(fieldName, value, errors) {
  if (!isRequired(value)) {
    errors.push(`${fieldName} is required`);
  }
}

function validateField(name, value, validator, errorMessage, errors) {
  if (!validator(value)) {
    errors.push(errorMessage.replace('{field}', name));
  }
}

function validateCarFields(car) {
  const errors = [];

  validateRequired('brand', car.brand, errors);
  validateRequired('model', car.model, errors);
  validateRequired('year', car.year, errors);
  validateRequired('plate', car.plate, errors);
  duplicatePlate(car.plate, cars) && errors.push('car plate already registered');

  if (car.year && !validateYear(car.year)) {
    errors.push(`year must be between ${new Date().getFullYear() - 10} and ${new Date().getFullYear()}`);
  }

  if (car.plate && !validatePlate(car.plate)) {
    errors.push('plate must be in the correct format ABC-1C34');
  }
  return errors;
}
module.exports = {
  isRequired,
  validatePlate,
  validateYear,
  validateCarFields,
};
