const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
