const multer = require('multer')
const { extname } = require('path')
const { urlFile } = require('../config/constants')

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: urlFile,
        filename(req, file, callback){
            const extension = extname(file.originalname)
            const name = file.originalname.split(extension)[0]
            callback(null, `${name}-${Date.now()}${extension}`)
        }
    }),
    limits: {
        fileSize: 15000000
    }
})

module.exports = multerUpload