const Worker = require('../models/worker.model');
const cloudinary = require('../config/cloudinary')

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const listarTrabajadores = async (req, res) => {
    try {
        const workers = await Worker.find().sort({ mobile: 1 }).select('-_id name id motorcycleType mobile bloodType birthdate file');
        const formattedWorkers = workers.map(worker => ({
            ...worker.toObject(),
            birthdate: formatDate(worker.birthdate)
        }));
        res.json(formattedWorkers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearTrabajador = async (req, res) => {
    const { name, id, motorcycleType, mobile, bloodType, birthdate } = req.body;

    const file = req.file ? req.file.path : null;

    try {
        const existingWorker = await Worker.findOne({ mobile });
        if (existingWorker) {
            return res.status(400).json({ message: 'El número de móvil ya está en uso por otro trabajador.' });
        }

        if (!file) {
            return res.status(400).json({
                message: 'No se ha recibido ningún archivo.'
            });
        }

        const newWorker = new Worker({
            name,
            id,
            motorcycleType,
            mobile,
            bloodType,
            birthdate,
            file
        });

        await newWorker.save();
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const actualizarTrabajador = async (req, res) => {
    const { mobile } = req.params;
    const { newMobile, ...updateFields } = req.body;
    const file = req.file

    console.log('Datos recibidos para actualizar:', req.body);
    console.log('Archivo recibido:', req.file);

    try {
        const updatedWorker = await Worker.findOne({ mobile })
        if (!updatedWorker) {
            await cloudinary.uploader.destroy(file.filename)
            return res.status(404).json({ message: 'Trabajador no encontrado', file });
        }
        
        if (newMobile && newMobile !== mobile) {
            const existingMobileWorker = await Worker.findOne({ mobile: newMobile });
            if (existingMobileWorker) {
                await cloudinary.uploader.destroy(file.filename)
                return res.status(400).json({ message: 'El número de móvil ya está en uso por otro trabajador.' });
            }
            updatedWorker.mobile = newMobile;
        }

        if (updatedWorker.file) {
            const publicId = updatedWorker.file.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(publicId)
        } 
        
        let newFile = updatedWorker.file
        if (file) {
            newFile = file.path
        }

        Object.assign(updatedWorker, updateFields)
        updatedWorker.file = newFile

        await updatedWorker.save()

        res.json({ message: 'Trabajador actualizado', updatedWorker })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const eliminarTrabajador = async (req, res) => {
    const { mobile } = req.params;

    try {
        const deleteWorker = await Worker.findOne({ mobile })
        if (!deleteWorker) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        if (deleteWorker.file) {
            const publicId = deleteWorker.file.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(publicId)
        }

        await Worker.findOneAndDelete({ mobile })
        res.json({ message: 'Trabajador eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listarTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
};