const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("../config/statusCodes");
const { Logger } = require("../helpers/logger");
const {
  hashPassword,
  getJwtToken,
  comparePassword,
} = require("../utils/authUtil");

const User = require("../models/userModel");
const SendResponse = require("../utils/sendResponseUtil");

// Cookie Options
const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days validity
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

// @decs Create New User
// @route POST /v1/user/signup
// @access PUBLIC
const signupUser = asyncHandler(async (req, res) => {
  // Get Data From Request
  const { name, email, password } = req.body;

  // Check if User Exists
  const user = await User.findOne({ email });

  // If User Exists
  if (user) {
    res.status(StatusCodes.CONFLICT);
    throw new Error("Email Already Exists!");
  }

  //   Creating a new user
  const newUser = new User({
    name,
    email,
    password: await hashPassword(password),
  });

  await newUser.save();

  Logger.info(`${newUser.name} - ${newUser.email} just signed up!`);

  const userObj = {
    name: newUser.name,
    email: newUser.email,
    accessToken: getJwtToken(newUser._id),
  };

  // Sending response
  SendResponse(
    res,
    StatusCodes.CREATED,
    "Registered Successfully!",
    true,
    userObj
  );
});

// @decs Signin User & Get Token
// @route POST /v1/user/signin
// @access PUBLIC
const signinUser = asyncHandler(async (req, res) => {
  // Get Data From Request
  const { email, password } = req.body;

  // Check if User Exists
  const user = await User.findOne({ email }).select("+password");

  // If User Does Not Exist
  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Account Does Not Exist!");
  }

  // Check password
  const isMatch = await comparePassword(password, user.password);

  // If Password Does Not Match
  if (!isMatch) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid Email or Password!");
  }

  // Logging User In Console
  Logger.info(`${user.name} - ${user.email} just logged in!`);

  const userObj = {
    name: user.name,
    email: user.email,
    accessToken: getJwtToken(user._id),
  };

  // Sending response
  SendResponse(res, StatusCodes.OK, "You are now logged in!", true, userObj);
});

module.exports = { signupUser, signinUser };
