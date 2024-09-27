const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload.controller')
const multerUpload = require('../middleware/multer')

router.post("/upload", multerUpload.single('file'), upload)

module.exports = router