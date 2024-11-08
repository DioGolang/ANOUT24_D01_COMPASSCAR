const UserService = require('../../domain/service/user.service');
const UserValidationService = require('../../domain/service/user-validation.service');
const AuthValidationService = require('./auth-validation.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthService = {
	async register(userDTO) {
		await UserValidationService.ensureEmailNotInUse(userDTO.email);
		return UserService.register(userDTO);
	},
	async login(email, password) {
		const user = await AuthValidationService.userExists(email);
		await AuthValidationService.passwordMatches(password, user);
		const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
		return { token };
	},
};
module.exports = AuthService;
