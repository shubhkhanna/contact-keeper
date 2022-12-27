const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("../config/statusCodes");
const { Logger } = require("../helpers/logger");
const {
  hashToken,
  generateToken,
  compareToken,
} = require("../helpers/tokenHelper");

const User = require("../models/userModel");

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
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Email Already Exists!");
  }

  //   Creating a new user
  const newUser = new User({
    name,
    email,
    password: await hashToken(password),
  });

  await newUser.save();

  Logger.info(`${newUser.name} - ${newUser.email} just signed up!`);

  // Sending response
  res.status(StatusCodes.CREATED).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    accessToken: generateToken(newUser._id),
  });
});

// @decs Signin User & Get Token
// @route POST /v1/user/signin
// @access PUBLIC
const signinUser = asyncHandler(async (req, res) => {
  // Get Data From Request
  const { email, password } = req.body;

  // Check if User Exists
  const user = await User.findOne({ email });

  // If User Does Not Exist
  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Account Does Not Exist!");
  }

  // Check password
  const isMatch = await compareToken(password, user.password);

  // If Password Does Not Match
  if (!isMatch) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid Email or Password!");
  }

  // Logging User In Console
  Logger.info(`${user.name} - ${user.email} just logged in!`);

  // Sending response
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken: generateToken(user._id),
  });
});

module.exports = { signupUser, signinUser };
