const dbConnection = require('../utils/db');

const CarModel = {
  findAll: async function() {
    try {
      const connection = await dbConnection();
      const [rows] = await connection.query('SELECT * FROM cars');
      connection.end();
      return rows;
    } catch (error) {
      console.error('Error fetching cars:', error.message);
      throw error;
    }
  },

  findByPlate: async function(plate) {
    try {
      const connection = await dbConnection();
      const [rows] = await connection.query('SELECT * FROM cars WHERE plate = ?', [plate]);
      connection.end();
      return rows[0];
    } catch (error) {
      console.error('Error fetching car by plate:', error.message);
      throw error;
    }
  },
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