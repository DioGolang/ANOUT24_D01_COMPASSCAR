const UserRepository = require('../../infra/repositories/user.repository');
const UserException = require('../../domain/exceptions/User.exception');

const UserValidationService = {
	async ensureEmailNotInUse(email) {
		const userExists = await UserRepository.findByEmail(email);
		if (userExists) {
			throw new UserException('Email already in use', 400, 'USER_EXISTS');
		}
	},
};
module.exports = UserValidationService;
