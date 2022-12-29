const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("../config/statusCodes");
const contactModel = require("../models/contactModel");
const deletedContactModel = require("../models/deletedContactModel");
const { isValidObjectId } = require("mongoose");

// @decs Get all contacts of a user
// @route GET /v1/contact/
// @access PRIVATE
const getAllContacts = asyncHandler(async (req, res) => {
  // getting user id from request
  const { _id: userId } = req.user;

  try {
    // getting all contacts of a user
    const contacts = await contactModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    // sending response
    res.status(StatusCodes.OK).json({ contacts });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server Error!");
  }
});

// @desc Create a contact
// @route POST /v1/contact/
// @access PRIVATE
const createContact = asyncHandler(async (req, res) => {
  //getting user id from request
  const { _id: userId } = req.user;

  // getting contact details from request body
  const { contactName, contactEmail, contactPhone, contactType } = req.body;

  // Checking if contact phone number already exists for particular user
  const isContactPhoneExist = await contactModel.findOne({
    contactPhone,
    user: userId,
  });

  // if exist then throw error
  if (isContactPhoneExist) {
    res.status(StatusCodes.CONFLICT);
    throw new Error("Contact already exists!");
  }

  try {
    // create a new contact
    const newContact = new contactModel({
      contactName,
      contactEmail,
      contactPhone,
      contactType,
      user: userId,
    });

    // save contact to database
    const contact = await newContact.save();

    // sending response
    res.status(StatusCodes.CREATED).json({
      contact,
      success: true,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server Error!");
  }
});

// @desc Update a contact
// @route PUT /v1/contact/:id
// @access PRIVATE
const updateContact = asyncHandler(async (req, res) => {
  // getting contact id from request params
  const { id: contactId } = req.params;

  // getting contact details from request body
  const { contactName, contactEmail, contactPhone, contactType } = req.body;

  // getting user id from request
  const { _id: userId } = req.user;

  // checking if contact id is valid or not
  const isValid = isValidObjectId(contactId);

  // if not valid then throw error
  if (!isValid) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Invalid contact id!");
  }

  // checking if contact exists or not
  const isContact = await contactModel.findById(contactId);

  // if not exists then throw error
  if (!isContact) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Contact not found!");
  }

  // checking if contact belongs to user or not
  if (isContact.user.toString() !== userId.toString()) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Not authorized!");
  }

  // checking if contact phone number already exists for particular user
  const isContactPhoneExist = await contactModel.findOne({
    contactPhone,
    user: userId,
  });

  // if exist then throw error
  if (isContactPhoneExist) {
    res.status(StatusCodes.CONFLICT);
    throw new Error("Contact already exists!");
  }

  try {
    // updating contact
    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      { $set: { contactName, contactEmail, contactPhone, contactType } },
      { new: true }
    );

    // sending response
    res.status(StatusCodes.OK).json({ updatedContact, success: true });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server Error!");
  }
});

// @desc Delete a contact
// @route DELETE /v1/contact/:id
// @access PRIVATE
const deleteContact = asyncHandler(async (req, res) => {
  // getting contact id from request params
  const { id: contactId } = req.params;

  // getting user id from request
  const { _id: userId } = req.user;

  // checking if contact id is valid or not
  const isValid = isValidObjectId(contactId);

  // if not valid then throw error
  if (!isValid) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Invalid contact id!");
  }

  // checking if contact exists or not
  const isContact = await contactModel.findById(contactId);

  // if not exists then throw error
  if (!isContact) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Contact not found!");
  }

  // checking if contact belongs to user or not
  if (isContact.user.toString() !== userId.toString()) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Not authorized!");
  }

  try {
    // deleting contact
    const deletedContact = await contactModel.findByIdAndDelete(contactId);

    // saving deleted contact to deletedContacts collection
    const deletedContactToCollection = new deletedContactModel({
      contactName: deletedContact.contactName,
      contactEmail: deletedContact.contactEmail,
      contactPhone: deletedContact.contactPhone,
      contactType: deletedContact.contactType,
      contactId: deletedContact._id,
      user: deletedContact.user,
    });

    // saving deleted contact to deletedContacts collection
    await deletedContactToCollection.save();

    // sending response
    res.status(StatusCodes.OK).json({ success: true });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server Error!");
  }
});

// @desc Get all deleted contacts of a user
// @route GET /v1/contact/deleted
// @access PRIVATE
const getAllDeletedContacts = asyncHandler(async (req, res) => {
  // getting user id from request
  const { _id: userId } = req.user;

  try {
    // getting all deleted contacts of user
    const deletedContacts = await deletedContactModel
      .find({ user: userId })
      .sort({ expireAt: -1 });

    // sending response
    res.status(StatusCodes.OK).json({ deletedContacts });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server Error!");
  }
});

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getAllDeletedContacts,
};
