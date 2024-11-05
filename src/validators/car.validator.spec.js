const {
  isRequired,
  validatePlate,
  validateYear,
  validateCarFields
} = require('./car.validator');

describe('Validation Functions', () => {

  test('should return true if value is not empty or undefined', () => {
    expect(isRequired('Hello')).toBe(true);
    expect(isRequired('   ')).toBe(false);
    expect(isRequired('   test   ')).toBe(true);
    expect(isRequired('')).toBe(false);
    expect(isRequired(undefined)).toBe(false);
    expect(isRequired(null)).toBe(false);
  });

  test('should return true for a valid plate format', () => {
    expect(validatePlate('ABC-1C34')).toBe(true);
  });

  test('should return false for an invalid plate format', () => {
    expect(validatePlate('AB1-1C34')).toBe(false);
    expect(validatePlate('ABC-1C3')).toBe(false);
    expect(validatePlate('ABC-1C3D')).toBe(false);
    expect(validatePlate('ABC-1C34D')).toBe(false);
    expect(validatePlate('abc-1C34')).toBe(false);
  });

  test('should return true for valid year within range', () => {
    const currentYear = new Date().getFullYear();
    expect(validateYear(currentYear)).toBe(true);
    expect(validateYear(currentYear - 5)).toBe(true);
    expect(validateYear(currentYear + 5)).toBe(true);
  });

  test('should return false for year outside the valid range', () => {
    const currentYear = new Date().getFullYear();
    console.log("Current Year:", currentYear);
    expect(validateYear(currentYear - 11)).toBe(false);
    expect(validateYear(currentYear + 11)).toBe(false);
  });

  test('should return error messages for invalid car fields', () => {
    const car = {
      brand: '',
      model: '',
      year: 2023,
      plate: 'AB1-1C34',
    };

    const errors = validateCarFields(car);
    expect(errors).toEqual([
      'brand is required',
      'model is required',
      'plate must be in the correct format ABC-1C34',
    ]);
  });

  test('should return no error for valid car fields', () => {
    const car = {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-1C34',
    };

    const errors = validateCarFields(car);
    expect(errors).toEqual([]);
  });

  test('should return error for invalid plate format', () => {
    const car = {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-1234',
    };

    const errors = validateCarFields(car);
    expect(errors).toEqual([
      'plate must be in the correct format ABC-1C34'
    ]);
  });

  test('should return error for year outside valid range', () => {
    const car = {
      brand: 'Toyota',
      model: 'Corolla',
      year: new Date().getFullYear() + 11,
      plate: 'ABC-1C34',
    };

    const errors = validateCarFields(car);
    expect(errors).toEqual([
      `year must be between ${new Date().getFullYear() - 10} and ${new Date().getFullYear()}`,
    ]);
  });

});

