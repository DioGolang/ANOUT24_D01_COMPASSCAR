const hashPassword = require('../../utils/hash.password');
const UserRepository = require('../../infra/repositories/user.repository');

async function create(userDTO) {
  return await UserRepository.create({
    ...userDTO.toObject(),
    password: hashPassword(userDTO.password),
  });
}
module.exports = { create };
