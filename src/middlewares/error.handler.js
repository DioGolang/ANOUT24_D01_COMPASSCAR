const CarException = require("../errors/car.exception");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CarException) {
    return res.status(err.status).json({ errors: [err.message] });
  }
  res.status(500).json({ errors: ["an internal server error occurred"] });
};
module.exports = errorHandler;