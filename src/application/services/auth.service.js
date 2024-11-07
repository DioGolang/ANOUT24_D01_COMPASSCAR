const UserService = require('../services/user.sevice');
const UserRepository = require('../../infra/repositories/user.repository');
const UserException = require('../../domain/exceptions/User.exception');
require('dotenv').config();

const AuthService = {
  async register(userDTO) {
    const userExists = await UserRepository.findByEmail(userDTO.email);
    if (userExists) {
      throw new UserException('Email already in use', 400, 'USER_EXISTS');
    }
    return await UserService.create(userDTO);
  },
};
module.exports = AuthService;
