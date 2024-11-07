const UserException = require('../../domain/exceptions/User.exception');

const validationUserDataHandler = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new UserException('name, email and password are required', 400);
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = validationUserDataHandler;