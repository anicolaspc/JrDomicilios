const path = require('path')

const urlFile = path.join(__dirname, '../../uploads')
const ipFileServer = "http://localhost:5000/api/files"

module.exports = { 
    urlFile,
    ipFileServer
}