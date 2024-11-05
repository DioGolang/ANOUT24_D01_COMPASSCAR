const {
  isRequired,
  duplicatePlate,
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
    expect(isRequired([])).toBe(false);
    expect(isRequired({})).toBe(false);
    expect(isRequired(undefined)).toBe(false);
    expect(isRequired(null)).toBe(false);
  });

  // Testando duplicatePlate
  describe('duplicatePlate', () => {
    const cars = [
      { plate: 'ABC-1234' },
      { plate: 'XYZ-5678' },
      { plate: 'AAA-0000' }
    ];

    test('should return true if the plate is duplicate', () => {
      expect(duplicatePlate('ABC-1234', cars)).toBe(true);
    });

    test('should return false if the plate is not duplicate', () => {
      expect(duplicatePlate('ZZZ-9999', cars)).toBe(false);
    });
  });

  // Testando validatePlate
  describe('validatePlate', () => {
    test('should return true for a valid plate format', () => {
      expect(validatePlate('ABC-1C34')).toBe(true);
    });

    test('should return false for an invalid plate format', () => {
      expect(validatePlate('AB1-1C34')).toBe(false);
      expect(validatePlate('ABC1C34')).toBe(false);
      expect(validatePlate('ABC-1C3')).toBe(false);
      expect(validatePlate('ABC-1C3D')).toBe(false);
      expect(validatePlate('ABC-1C34D')).toBe(false);
      expect(validatePlate('abc-1C34')).toBe(false);
    });
  });

  // Testando validateYear
  describe('validateYear', () => {
    const currentYear = new Date().getFullYear();

    test('should return true for valid year within range', () => {
      expect(validateYear(currentYear)).toBe(true);
      expect(validateYear(currentYear - 9)).toBe(true);
      expect(validateYear(currentYear + 1)).toBe(true);
    });

    test('should return false for year outside the valid range', () => {
      expect(validateYear(currentYear - 10)).toBe(false);
      expect(validateYear(currentYear + 2)).toBe(false);
    });
  });

  describe('validateCarFields', () => {
    const cars = [
      { plate: 'ABC-1234' },
      { plate: 'XYZ-5678' }
    ];

    test('should return error messages for invalid car fields', () => {
      const car = {
        brand: '',
        model: '',
        year: 2023,
        plate: 'AB1-1C34',  // Placa inválida
      };

      const errors = validateCarFields(car, cars);
      expect(errors).toEqual([
        'brand is required',
        'model is required',
        'plate must be in the correct format ABC-1C34',  // Formato de placa errado
      ]);
    });

    test('should return no error for valid car fields', () => {
      const car = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-1C34',  // Placa válida
      };

      const errors = validateCarFields(car, cars);
      expect(errors).toEqual([]);  // Nenhum erro
    });

    test('should return error for invalid plate format', () => {
      const car = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-1237',
      };

      const errors = validateCarFields(car, cars);
      expect(errors).toEqual([
        'plate must be in the correct format ABC-1C34'
      ]);
    });

    test('should return error for year outside valid range', () => {
      const car = {
        brand: 'Toyota',
        model: 'Corolla',
        year: new Date().getFullYear() + 11,  // Ano fora do intervalo
        plate: 'ABC-1C34',
      };

      const errors = validateCarFields(car, cars);
      expect(errors).toEqual([
        `year must be between ${new Date().getFullYear() - 10} and ${new Date().getFullYear()}`,
      ]);
    });

    test('should return error for duplicate plate', () => {
      const car = {
        brand: 'Honda',
        model: 'Civic',
        year: 2022,
        plate: 'ABC-1234',  // Placa duplicada
      };

      const errors = validateCarFields(car, cars);
      expect(errors).toContain('car plate already registered');
    });
  });
});
