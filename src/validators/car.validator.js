function isRequired(value) {
	return (
		value !== undefined &&
		value !== null &&
		value.toString().trim() !== '' &&
		!(typeof value === 'object' && Object.keys(value).length === 0)
	);
}

function duplicatePlate(plate, cars = []) {
	if (!Array.isArray(cars)) {
		cars = [];
	}
	return cars.some((car) => car.plate === plate);
}

function validatePlate(plate) {
	if (plate.length !== 8) {
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
	const minYear = currentYear - 9;
	const maxYear = currentYear + 1;
	console.log(year >= minYear && year <= maxYear);
	return year >= minYear && year <= maxYear;
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

function validateCarFields(car, cars) {
	const errors = [];

	validateRequired('brand', car.brand, errors);
	validateRequired('model', car.model, errors);
	validateRequired('year', car.year, errors);
	validateRequired('plate', car.plate, errors);
	duplicatePlate(car.plate, cars) && errors.push('car plate already registered');

	if (car.plate && !validatePlate(car.plate)) {
		errors.push('plate must be in the correct format ABC-1C34');
	}

	if (car.year && !validateYear(car.year)) {
		errors.push(`year must be between ${new Date().getFullYear() - 10} and ${new Date().getFullYear()}`);
	}

	return errors;
}
module.exports = {
	isRequired,
	duplicatePlate,
	validatePlate,
	validateYear,
	validateCarFields,
};
