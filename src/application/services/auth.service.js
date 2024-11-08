const UserService = require('../services/user.sevice');
const UserValidationService = require('../../domain/service/user-validation.service');
const AuthValidationService = require('./auth-validation.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthService = {
	async register(userDTO) {
		await UserValidationService.ensureEmailNotInUse(userDTO.email);
		return await UserService.create(userDTO);
	},
	async login(email, password) {
		const user = await AuthValidationService.userExists(email);
		await AuthValidationService.passwordMatches(password, user);
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});
		return { token };
	},
};
module.exports = AuthService;
