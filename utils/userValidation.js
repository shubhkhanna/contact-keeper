const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("../config/statusCodes");

const validateSignup = [
  check("name").trim().not().isEmpty().withMessage("Name is required!"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password should be combination of one uppercase , one lowercase, one special char, one digit and min 6 char long!"
    ),
];

const validateSignin = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password should be combination of one uppercase , one lowercase, one special char, one digit and min 6 char long!"
    ),
];

const validate = (req, res, next) => {
  const errors = validationResult(req).array();

  if (!errors.length) return next();

  res.status(StatusCodes.BAD_REQUEST);
  throw new Error(errors[0].msg);
};

module.exports = {
  validateSignup,
  validateSignin,
  validate,
};
