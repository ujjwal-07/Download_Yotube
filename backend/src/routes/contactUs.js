const express = require('express');
const { contactFormHandler } = require('../controllers/contactUsController');

const router = express.Router();

router.post('/add', contactFormHandler);
module.exports = router;
