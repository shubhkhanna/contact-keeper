const asyncHandler = require("express-async-handler");
const { Logger } = require("../helpers/logger");
const { hashToken, generateToken } = require("../helpers/tokenHelper");

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
    res.status(400);
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
  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    accessToken: generateToken(newUser._id),
  });
});

module.exports = { signupUser };
