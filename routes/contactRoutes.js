const express = require("express");
const { getAllContacts } = require("../controllers/contactController");
const authHandler = require("../middleware/authHandler");
const router = express.Router();

router.route("/").get(authHandler, getAllContacts);

module.exports = router;
