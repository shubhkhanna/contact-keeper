const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const { Logger } = require("./helpers/logger");
const { NODE_ENV, PORT, CLIENT_URL } = require("./config/keys");
const { BadRequestError, NotFoundError } = require("./middleware/errorHandler");

// create express app
const app = express();

// Connecting to MongoDB
connectDb();

// API Security
app.use(helmet());

// handle CORS errors
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// cookies parser middleware
app.use(cookieParser());

// log all requests to the console
app.use(morgan("combined", { stream: Logger.stream.write }));

app.use(express.json());

// Define Routes
app.use("/v1/user", require("./routes/userRoutes"));
app.use("/v1/contact", require("./routes/contactRoutes.js"));

// Serve Static assets in production
if (NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Handle errors
app.use(BadRequestError);
app.use(NotFoundError);

// listen to port 5000
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
