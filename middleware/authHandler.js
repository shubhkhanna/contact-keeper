const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require("../config/keys");
const User = require("../models/userModel");
const { StatusCodes } = require("../config/statusCodes");

const authHandler = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //   decoding the token
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      // if token is expired
      if (error.name === "TokenExpiredError") {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Token Expired!");
      }

      // if token is invalid
      if (error.name === "JsonWebTokenError") {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Invalid Token!");
      }
    }
  }

  // If no token
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Unauthorized Access, No Token Provided!");
  }
});

module.exports = authHandler;
