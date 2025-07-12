const express = require('express');
const { downloadVideo, downloadMp3 } = require('../controllers/downloadController');

const router = express.Router();

router.get('/download', downloadVideo);
router.get("/downloadmp3",downloadMp3)
module.exports = router;
