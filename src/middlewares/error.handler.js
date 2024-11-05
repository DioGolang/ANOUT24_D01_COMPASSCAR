const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: ["an internal server error occurred"] });
};

module.exports = errorHandler;