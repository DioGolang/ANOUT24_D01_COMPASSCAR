const mysql = require('mysql2/promise')
require('dotenv').config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const dbConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connection to the database successfully established!');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    throw error;
  }
}

module.exports = dbConnection;