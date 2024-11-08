const UserRepository = require('../../infra/repositories/user.repository');
const UserException = require('../../domain/exceptions/User.exception');

const UserValidationService = {
	async ensureEmailNotInUse(email) {
		const UserExists = await UserRepository.findByEmail(email);
		if (UserExists) {
			throw new UserException('Email already in use', 400, 'USER_EXISTS');
		}
	},
};
module.exports = UserValidationService;
