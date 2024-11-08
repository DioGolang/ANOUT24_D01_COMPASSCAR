const dbConnection = require('../../utils/db');

const userRepository = {
	async create(user) {
		console.log(user);
		const connection = await dbConnection();
		const [result] = await connection.query('INSERT INTO users SET ?', user);
		connection.end();
		return { id: result.insertId, ...user };
	},
	async findByEmail(email) {
		const connection = await dbConnection();
		const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
		connection.end();
		return rows[0];
	},
};
module.exports = userRepository;
