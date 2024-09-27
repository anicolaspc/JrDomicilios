const Worker = require('../models/worker.model');

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const listarTrabajadores = async (req, res) => {
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
};

const crearTrabajador = async (req, res) => {
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
};

const actualizarTrabajador = async (req, res) => {
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
};

const eliminarTrabajador = async (req, res) => {
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
};

module.exports = {
    listarTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
};
