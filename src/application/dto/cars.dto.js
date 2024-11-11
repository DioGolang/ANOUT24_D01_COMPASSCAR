const CarException = require('../../domain/exceptions/Car.exception');

class CarsDto {
	constructor({ brand, model, year, plate }) {
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.plate = plate;
		this.validate();
	}

	validate() {
		const validationErrors = [];
		if (!this.brand) validationErrors.push('Brand is required');
		if (!this.model) validationErrors.push('Model is required');
		if (!this.year) validationErrors.push('Year is required');
		if (!this.plate) validationErrors.push('Plate is required');
		if (validationErrors.length > 0) {
			throw new CarException(validationErrors.join(', '), 400, 'VALIDATION_ERROR');
		}
	}
	toObject() {
		return {
			brand: this.brand,
			model: this.model,
			year: this.year,
			plate: this.plate,
		};
	}
}
module.exports = CarsDto;
