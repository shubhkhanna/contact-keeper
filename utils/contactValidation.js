const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("../config/statusCodes");

// validate contact creation
const validateCreateContact = [
  check("contactName").not().isEmpty().withMessage("Contact name is required!"),
  check("contactEmail")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email!"),
  check("contactPhone")
    .not()
    .isEmpty()
    .withMessage("Contact phone is required!"),
  check("contactType")
    .optional()
    .isIn(["personal", "professional"])
    .withMessage("Invalid contact type!"),
];

// validate update contact
const validateUpdateContact = [
  check("contactName")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Contact name is required!"),
  check("contactEmail")
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email!"),
  check("contactPhone")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Contact phone is required!"),
  check("contactType")
    .optional()
    .isIn(["personal", "professional"])
    .withMessage("Invalid contact type!"),
];

// validate schema for contact
const validate = (req, res, next) => {
  const errors = validationResult(req).array();

  if (!errors.length) return next();

  res.status(StatusCodes.BAD_REQUEST);
  throw new Error(errors[0].msg);
};

module.exports = { validateCreateContact, validateUpdateContact, validate };
