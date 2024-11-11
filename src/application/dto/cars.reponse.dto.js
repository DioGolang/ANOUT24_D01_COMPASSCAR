class CarsReponseDto {
	constructor({ id, brand, model, year }) {
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.year = year;
	}
	toObject() {
		return {
			id: this.id,
			brand: this.brand,
			model: this.model,
			year: this.year,
		};
	}
}
