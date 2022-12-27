const { StatusCodes } = require("../config/statusCodes");
const { Logger } = require("../helpers/logger");

const NotFoundError = (req, res, next) => {
  Logger.error(
    `${req.method} - Not Found! - ${req.originalUrl} - ${StatusCodes.NOT_FOUND}`
  );

  res.status(StatusCodes.NOT_FOUND);
  next(error);
};

const BadRequestError = (error, req, res, next) => {
  const statusCode =
    res.statusCode === StatusCodes.OK
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;

  Logger.error(
    `${req.method} - ${error.message} - ${req.originalUrl} - ${statusCode}`
  );

  res.status(statusCode).json({
    message: error.message,
  });
};

module.exports = { BadRequestError, NotFoundError };
