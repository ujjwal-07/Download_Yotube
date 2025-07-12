// models/contactModel.js

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
