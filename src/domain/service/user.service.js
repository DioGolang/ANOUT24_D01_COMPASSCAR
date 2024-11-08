const userRepository = require('../../infra/repositories/user.repository');
const hashPassword = require('../../utils/hash.password');
const UserException = require('../exceptions/User.exception');

const userService = {
	async register(userData) {
		validateUserInput(userData);
		const hashedPassword = await hashPassword.hash(userData.password);
		const userWithHashedPassword = { ...userData, password: hashedPassword };
		return await userRepository.create(userWithHashedPassword);
	},
};

function validateUserInput(userData) {
	if (!userData.email || !userData.password) {
		throw new UserException('Email and password are required', 400, 'INVALID_INPUT');
	}
}
module.exports = userService;
