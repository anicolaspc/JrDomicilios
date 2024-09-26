const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

// Crear un trabajador (sin imagen)
router.post('/', async (req, res) => {
    const { name, id, motorcycleType, mobile, bloodType, birthdate } = req.body;
    try {
        const newWorker = new Worker({
            name,
            id,
            motorcycleType,
            mobile,
            bloodType,
            birthdate
        });
        await newWorker.save();
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los trabajadores
router.get('/', async (req, res) => {
    try {
        const workers = await Worker.find().select('-_id name id motorcycleType mobile bloodType birthdate');
        const formattedWorkers = workers.map(worker => ({
            ...worker.toObject(),
            birthdate: formatDate(worker.birthdate)
        }));

        res.json(formattedWorkers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un trabajador
router.put('/:mobile', async (req, res) => {
    const { mobile } = req.params;
    const { name, id, motorcycleType, bloodType, birthdate } = req.body;

    try {
        const updatedWorker = await Worker.findOneAndUpdate(
            { mobile },
            {
                name,
                id,
                motorcycleType,
                bloodType,
                birthdate
            },
            { new: true, runValidators: true }
        );

        if (!updatedWorker) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        res.json(updatedWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un trabajador
router.delete('/:mobile', async (req, res) => {
    const { mobile } = req.params;

    try {
        const deleteWorker = await Worker.findOneAndDelete({ mobile });
        if (!deleteWorker) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        res.json({ message: 'Trabajador eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
