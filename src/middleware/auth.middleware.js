const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model');


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. No hay token ' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = await Admin.findById(decoded.id)
        if (!req.admin) {
            return res.status(401).json({ message: "Token no válido" });
        }
        next()
    } catch (error) {
        res.status(400).json({ message: 'Token no valido' })
    }
}

module.exports = authMiddleware