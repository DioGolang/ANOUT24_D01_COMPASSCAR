const dbConnection = require('../utils/db');

const CarModel = {

  findAll: async function(filters = {}) {
    try {
      const connection = await dbConnection();
      let { year, final_place, brand, limit = 5, page = 1 } = filters; // fazer um middleware para validar os campos
      const conditions = [];
      const params = [];

      if( page < 1) {
       page = 1;
      }
      if(limit < 1) {
        limit = 5;
      }
      if(limit >= 10) {
        limit = 10;
      }

      if (year) {
        conditions.push('year = ?');
        params.push(year);
      }
      if (final_place) {
        conditions.push('plate LIKE ?');
        params.push(`%${final_place}`);
      }
      if (brand) {
        conditions.push('brand = ?');
        params.push(brand);
      }
      const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const offset = (page - 1) * limit;
      const [cars] = await connection.query('SELECT * FROM cars' + whereClause + ' LIMIT ? OFFSET ?', [...params, limit, offset]);
      const [countResult] = await connection.query(`SELECT COUNT(*) as count FROM cars ${whereClause}`, params);
      const pages = Math.ceil(countResult[0].count / limit);
      connection.end();
      if(cars.length === 0) {
        return {count: countResult[0].count, pages: 0, data: []};
      }
      return {count: countResult[0].count, pages: pages, data: cars};
    } catch (error) {
      console.error('Error fetching cars:', error.message);
      throw error;
    }
  },

  findById: async function(id) {
    try {
      const connection = await dbConnection();
      const [rows] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
      connection.end();
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching car by id:', error.message);
      throw error;
    }
  },

  findByIdWithItems: async function(id) {
    try {
      const connection = await dbConnection();
      const [rows] = await connection.query('SELECT cars.*, COALESCE(cars_items.name, \'\') as name FROM cars LEFT JOIN cars_items ON cars.id = cars_items.car_id WHERE cars.id = ?', [id]);
      connection.end();

      console.log('rows', rows.name);
      const car = {
        id: rows[0].id,
        brand: rows[0].brand,
        model: rows[0].model,
        year: rows[0].year,
        plate: rows[0].plate,
        created_at: rows[0].created_at,
        items: rows.name ? rows.map(row => row.name) : []
      };
      return car;
    } catch (error) {
      console.error('Error fetching car by id:', error.message);
      throw error;
    }
  },

  findByPlate: async function(plate) {
    try {
      const connection = await dbConnection();
      const [rows] = await connection.query('SELECT * FROM cars WHERE plate = ?', [plate]);
      connection.end();
      console.log('rows', rows, rows[0]);
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
      const createdCar = await this.findById(result.insertId);
      return {id: createdCar.id, ...car, created_at: createdCar.created_at};u
    } catch (error) {
      console.error('Error creating car:', error.message);
      throw error;
    }
  }
}
module.exports = CarModel;