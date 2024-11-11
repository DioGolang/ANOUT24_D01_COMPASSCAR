const CarException = require('../exceptions/Car.exception');

class Car {
	constructor({ id, brand, model, year, plate }) {
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.plate = plate;
	}

	validateRequiredFields() {
		if (!this.isRequired(this.brand)) {
			throw new CarException('brand is required', 400, 'BRAND_REQUIRED');
		}
		if (!this.isRequired(this.model)) {
			throw new CarException('model is required', 400, 'MODEL_REQUIRED');
		}
		if (!this.isRequired(this.year)) {
			throw new CarException('year is required', 400, 'YEAR_REQUIRED');
		}
		if (!this.isRequired(this.plate)) {
			throw new CarException('plate is required', 400, 'PLATE_REQUIRED');
		}
	}

	isRequired(value) {
		return (
			value !== undefined &&
			value !== null &&
			value.toString().trim() !== '' &&
			!(typeof value === 'object' && Object.keys(value).length === 0)
		);
	}

	validatePlate() {
		if (this.plate.length !== 8) {
			throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
		}

		for (let i = 0; i < 3; i++) {
			if (!this.isLetter(this.plate[i])) {
				throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
			}
		}

		if (this.plate.charAt(3) !== '-') {
			throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
		}

		if (!this.isNumber(this.plate.charAt(4))) {
			throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
		}

		if (!this.isLetter(this.plate.charAt(5))) {
			throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
		}

		if (!this.isNumber(this.plate.charAt(6)) || !this.isNumber(this.plate.charAt(7))) {
			throw new CarException('plate must be in the correct format ABC-1C34', 400, 'INVALID_PLATE_FORMAT');
		}
	}

	validateYear() {
		const currentYear = new Date().getFullYear();
		const minYear = currentYear - 9;
		const maxYear = currentYear + 1;
		if (!(this.year >= minYear && this.year <= maxYear)) {
			throw new CarException(`year must be between ${minYear} and ${maxYear}`, 400, 'INVALID_YEAR');
		}
	}

	isLetter(char) {
		return char >= 'A' && char <= 'Z';
	}

	isNumber(char) {
		return char >= '0' && char <= '9';
	}

	validateCar(existingCars = []) {
		this.validateRequiredFields();

		if (existingCars.some((car) => car.plate === this.plate)) {
			throw new CarException('car already registered', 409, 'DUPLICATE_PLATE');
		}

		this.validatePlate();
		this.validateYear();
	}
}

module.exports = Car;
