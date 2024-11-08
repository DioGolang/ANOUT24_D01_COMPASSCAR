const { findByEmail } = require('../../infra/repositories/user.repository');
const UserException = require('../../domain/exceptions/User.exception');
const { compare } = require('../../utils/hash.password');
const AuthValidationService = {
	async userExists(email) {
		const user = await findByEmail(email);
		if (!user) {
			throw new UserException('User not found', 404, 'USER_NOT_FOUND');
		}
		return user;
	},
	async passwordMatches(password, user) {
		const isPasswordCorrect = await compare(password, user.password);
		console.log('is password correct', isPasswordCorrect);
		if (!isPasswordCorrect) {
			throw new UserException('Invalid password', 400, 'INVALID_PASSWORD');
		}
	},
};
module.exports = AuthValidationService;
