import CarException from '../../domain/exceptions/Car.exception';

class CarsItemsDto {
	constructor({ name, car_id }) {
		this.name = name;
		this.car_id = car_id;
		this.validate();
	}
	validate() {
		const validationErrors = [];
		if (!this.name) validationErrors.push('Name is required');
		if (!this.car_id) validationErrors.push('Car ID is required');
		if (validationErrors.length > 0) {
			throw new CarException(validationErrors.join(', '), 400, 'VALIDATION_ERROR');
		}
	}
	toObject() {
		return {
			name: this.name,
			car_id: this.car_id,
		};
	}
}
module.exports = CarsItemsDto;
