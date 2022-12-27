const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("../config/statusCodes");
const contactModel = require("../models/contactModel");

// @decs Get all contacts of a user
// @route GET /v1/contact/
// @access PRIVATE
const getAllContacts = asyncHandler(async (req, res) => {
  // getting user id from request
  const { _id: userId } = req.user;

  // getting all contacts of a user
  const contacts = await contactModel.find({ user: userId }).sort({
    createdAt: -1,
  });

  // sending response
  res.status(StatusCodes.OK).json({ contacts });
});

module.exports = { getAllContacts };
