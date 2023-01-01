const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compareSync(password, hashedPassword);
  return isMatch;
};

const getJwtToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  getJwtToken,
};
