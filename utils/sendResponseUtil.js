const SendResponse = (res, statusCode, message, success, data = null) => {
  res.status(statusCode).json({ success, message, statusCode, data });
};

module.exports = SendResponse;
