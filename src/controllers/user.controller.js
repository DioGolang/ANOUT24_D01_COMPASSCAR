const UserService = require('../services/user.service');

const UserController = {
  async register(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;