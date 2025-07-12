require('dotenv').config();
const express = require("express");
const downloadRoutes = require("./routes/download");
const contactUSRoutes = require("./routes/contactUs");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", downloadRoutes);
app.use("/contactUs", contactUSRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
