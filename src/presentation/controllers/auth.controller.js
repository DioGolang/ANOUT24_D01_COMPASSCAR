const UserDTO = require('../../application/dto/user.dto');
const UserResponseDTO = require('../../application/dto/user.response.dto');
const AuthService = require('../../application/services/auth.service');

const AuthController = {
	async register(req, res, next) {
		try {
			const userDTO = new UserDTO(req.body);
			userDTO.validate();
			const user = await AuthService.register(userDTO);
			const userResponseDTO = new UserResponseDTO(user);
			res.status(201).json(userResponseDTO.toObject());
		} catch (error) {
			next(error);
		}
	},
};
module.exports = AuthController;
