const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const saltRounds = 10;

const hashToken = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const compareToken = async (token, hashedToken) => {
  const isMatch = await bcrypt.compareSync(token, hashedToken);
  return isMatch;
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  hashToken,
  compareToken,
  generateToken,
};
