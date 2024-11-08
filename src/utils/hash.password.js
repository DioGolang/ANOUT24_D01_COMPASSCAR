const bcrypt = require('bcryptjs');

const hashPassword = {
	async hash(password) {
		return await bcrypt.hash(password, 10);
	},
	async compare(password, hash) {
		return await bcrypt.compare(password, hash);
	},
};
module.exports = hashPassword;
