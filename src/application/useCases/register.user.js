const userService = require('../../domain/service/user.service');
const UserException = require('../../domain/exceptions/User.exception');
const UserDTO = require('../dto/user.dto');

async function registerUser(userData) {
  if (!userData.email || !userData.password) {
    throw new UserException('Email and password are required', 400, 'INVALID_INPUT');
  }
  const userDTO = new UserDTO(userData);
  return await userService.register(userDTO);
}
module.exports = registerUser;
