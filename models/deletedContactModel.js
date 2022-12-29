const mongoose = require("mongoose");

const DeletedContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactType: {
    type: String,
    enum: ["personal", "professional"],
    default: "personal",
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "30d" },
  },
});

module.exports = mongoose.model("DeletedContact", DeletedContactSchema);
