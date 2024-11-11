const CarException = require('../../domain/exceptions/Car.exception');

class CarsDto {
	constructor({ name, brand, model, year }) {
		this.name = name;
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.validate();
	}

	validate() {
		const validationErrors = [];
		if (!this.name) validationErrors.push('Name is required');
		if (!this.brand) validationErrors.push('Brand is required');
		if (!this.model) validationErrors.push('Model is required');
		if (!this.year) validationErrors.push('Year is required');
		if (validationErrors.length > 0) {
			throw new CarException(validationErrors.join(', '), 400, 'VALIDATION_ERROR');
		}
	}
	toObject() {
		return {
			name: this.name,
			brand: this.brand,
			model: this.model,
			year: this.year,
		};
	}
}
module.exports = CarsDto;
