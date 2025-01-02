const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(403).json({ message: 'Acceso denegado. No hay token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. Token no válido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        if (!req.admin) {
            return res.status(403).json({ message: 'Acceso denegado. Administrador no encontrado' });
        }
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido' });
    }
}

module.exports = authMiddleware;