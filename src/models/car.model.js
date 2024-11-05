const dbConnection = require('../utils/db');

const CarModel = {
  async create(car) {
    try {
      const connection = await dbConnection();
      const [result] = await connection.query(
        `INSERT INTO cars (brand, model, year, plate) VALUES (?, ?, ?, ?)`,
        [car.brand, car.model, car.year, car.plate]
      );
      connection.end();
      return {id: result.insertId, ...car};
    } catch (error) {
      console.error('Error creating car:', error.message);
      throw error;
    }
  }
}

module.exports = CarModel;