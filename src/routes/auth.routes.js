const express = require('express')
const router = express.Router()
const { 
    login, 
    register,
    update
} = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', authMiddleware, register)
router.post('/login', login)
router.put('/update', authMiddleware, update)

module.exports = router