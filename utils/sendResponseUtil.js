const SendResponse = (
  res,
  statusCode,
  message,
  success,
  response_payload = null
) => {
  res
    .status(statusCode)
    .json({ success, message, statusCode, response_payload });
};

module.exports = SendResponse;
