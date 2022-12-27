const mongoose = require("mongoose");
const { Logger } = require("../helpers/logger");
const { MONGO_URI } = require("./keys");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    const response = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Logger.info(`DB Connected ==> ${response.connection.host}`);
  } catch (err) {
    Logger.error(`DB Error ==> ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
