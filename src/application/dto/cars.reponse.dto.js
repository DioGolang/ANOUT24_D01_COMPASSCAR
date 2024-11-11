class CarsResponseDTO {
	constructor({ id, brand, model, year, plate, created_at, updated_at }) {
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.plate = plate;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
	toObject() {
		return {
			id: this.id,
			brand: this.brand,
			model: this.model,
			year: this.year,
			plate: this.plate,
			created_at: this.created_at,
		};
	}
}
module.exports = CarsResponseDTO;
