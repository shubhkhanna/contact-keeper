const { createLogger, format, transports } = require("winston");

const Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.json(),
        format.timestamp({ format: "ddd DD MMMM YYYY hh:mm:ss A" }),
        format.colorize({ all: true }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

module.exports = { Logger };
