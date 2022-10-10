const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongoDB id error
  if (err.name === "CastError") {
    const message = `Resource not found. ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoDb duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error

  if (err.code === "jsonWebTokenError") {
    const message = `json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error

  if (err.code === "TokenExpiredError") {
    const message = `json web token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    // error: err,
    message: err.message,
  });
};
