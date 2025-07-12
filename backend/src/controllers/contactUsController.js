// controllers/contactController.js

const Contact = require("../models/contactModal");

const contactFormHandler = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("✅ New Contact saved to MongoDB:", newContact);

    return res.status(200).json({
      success: true,
      message: "Your message has been saved successfully!",
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = { contactFormHandler };
