const UserException = require('../domain/exceptions/User.exception');

const userService = {
  async create(user) {
    try {
      return await UserModel.register(user);
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new UserException('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
    }
  }
}
module.exports = userService;