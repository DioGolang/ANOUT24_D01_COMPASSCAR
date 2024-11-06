const dbConnection = require('../utils/db');
const { findById: findCar } = require('./car.model');

const CarItemModel = {

  async findByCarId(carId) {
    const connection = await dbConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM cars_items WHERE car_id = ?', [carId]);
      return rows;
    } catch (error) {
      console.error('Error fetching car items:', error.message);
      throw error;
    } finally {
      connection.end();
    }
  },

  // async create(items, carId) {
  //   const connection = await dbConnection();
  //   const createdItems = [];
  //
  //   console.log("PASSEI AQUI2", items, carId);
  //
  //   try {
  //     await connection.beginTransaction();
  //     for (let name of items) {
  //       const [result] = await connection.query(
  //         `INSERT INTO cars_items (name, car_id) VALUES (?, ?)`,
  //         [name, carId]
  //       );
  //       console.log(result.insertId);
  //       const createdItem = await findCar(result.insertId);
  //       createdItems.push({ id: createdItem.id, name: createdItem.name, created_at: createdItem.created_at });
  //     }
  //     await connection.commit();
  //
  //     return createdItems;
  //   } catch (error) {
  //     await connection.rollback();
  //     console.error('Error creating car items:', error.message);
  //     throw error;
  //   } finally {
  //     connection.end();
  //   }
  // }
  async create(items, carId) {
    const connection = await dbConnection();
    let createdItem;

    console.log("PASSEI AQUI2", items, carId);

    try {
      await connection.beginTransaction();
      const itemsString = items.join(", ");

      const [result] = await connection.query(
        `INSERT INTO cars_items (name, car_id) VALUES (?, ?)`,
        [itemsString, carId]
      );

      const [createdItems] = await connection.query(
        `SELECT id, name, created_at FROM cars_items WHERE id = ?`,
        [result.insertId]
      );
      createdItem = createdItems[0];
      await connection.commit();
      return {
        id: createdItem.id,
        name: createdItem.name,
        created_at: createdItem.created_at
      };
    } catch (error) {
      await connection.rollback();
      console.error('Error creating car items:', error.message);
      throw error;
    } finally {
      connection.end();
    }
  }

};
module.exports = CarItemModel;