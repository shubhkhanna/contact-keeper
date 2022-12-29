const express = require("express");
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getAllDeletedContacts,
} = require("../controllers/contactController");
const authHandler = require("../middleware/authHandler");
const {
  validateCreateContact,
  validate,
  validateUpdateContact,
} = require("../utils/contactValidation");
const router = express.Router();

router
  .route("/")
  .get(authHandler, getAllContacts)
  .post(authHandler, validateCreateContact, validate, createContact);
router
  .route("/:id")
  .put(authHandler, validateUpdateContact, validate, updateContact)
  .delete(authHandler, deleteContact);
router.route("/deleted").get(authHandler, getAllDeletedContacts);

module.exports = router;
