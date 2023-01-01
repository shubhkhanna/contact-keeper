const { StatusCodes } = require("../config/statusCodes");
const { Logger } = require("../helpers/logger");
const SendResponse = require("../utils/sendResponseUtil");

const NotFoundError = (req, res, next) => {
  Logger.error(
    `${req.method} - Not Found! - ${req.originalUrl} - ${StatusCodes.NOT_FOUND}`
  );

  SendResponse(res, StatusCodes.NOT_FOUND, "Not Found!", false);
  next();
};

const BadRequestError = (err, req, res, next) => {
  const statusCode =
    res.statusCode === StatusCodes.OK
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;

  Logger.error(
    `${req.method} - ${err.message} - ${req.originalUrl} - ${statusCode}`
  );

  SendResponse(res, statusCode, err.message, false);
};

module.exports = { BadRequestError, NotFoundError };
