const dbConnection = require('../utils/db');

const UserModel = {
  register: async function(user) {
    try {
      const connection = await dbConnection();
      const [result] = await connection.query('INSERT INTO users SET ?', user);
      connection.end();
      return { id: result.insertId, ...user };
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }
}
module.exports = UserModel;