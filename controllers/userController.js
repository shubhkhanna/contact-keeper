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
  // secure: true, // Uncomment this if you are using HTTPS
  sameSite: "none",
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

  const accessToken = getJwtToken(newUser._id);
  const userObj = { id: newUser._id, name: newUser.name, email: newUser.email };

  // Setting Cookies
  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("user", userObj, cookieOptions);

  // Sending response
  SendResponse(res, StatusCodes.CREATED, "Registered Successfully!", true);
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

  const accessToken = getJwtToken(user._id);
  const userObj = { id: user._id, name: user.name, email: user.email };

  // Setting Cookies
  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("user", userObj, cookieOptions);

  // Sending response
  SendResponse(res, StatusCodes.OK, "Logged In Successfully!", true);
});

module.exports = { signupUser, signinUser };
