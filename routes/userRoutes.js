const express = require("express");
const router = express.Router();
const { signupUser, signinUser } = require("../controllers/userController");
const {
  validateSignup,
  validateSignin,
  validate,
} = require("../utils/userValidation");

router.route("/signup").post(validateSignup, validate, signupUser);
router.route("/signin").post(validateSignin, validate, signinUser);

module.exports = router;
