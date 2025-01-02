const Admin = require('../models/admin.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { userName, password } = req.body
    try {
        const existingAdmin = await Admin.findOne({ userName })
        if (existingAdmin) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' })
        }
        const newAdmin = new Admin({ userName, password })
        await newAdmin.save()
        res.status(201).json({ message: 'Administrador registrado con exito' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { userName, password } = req.body
    try {
        const admin = await Admin.findOne({ userName })
        if (!admin) {
            return res.status(400).json({ message: userName + ' no encontrado' })
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    const { userName, newName, newPassword } = req.body;
    try {
        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
        }
        if (newName) {
            admin.userName = newName;
        }
        await admin.save();
        res.json({ message: 'Administrador actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    update
}