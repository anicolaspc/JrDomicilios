const Worker = require('../models/worker.model');
const fs = require('fs')
const path = require('path')
const {ipFileServer, urlFile} = require('../config/constants');

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const listarTrabajadores = async (req, res) => {
    try {
        const workers = await Worker.find().sort({mobile: 1}).select('-_id name id motorcycleType mobile bloodType birthdate file');
        const formattedWorkers = workers.map(worker => ({
            ...worker.toObject(),
            birthdate: formatDate(worker.birthdate)
        }));
        res.json(formattedWorkers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const crearTrabajador = async (req, res) => {
//     const { name, id, motorcycleType, mobile, bloodType, birthdate } = req.body;
//     const { file } = req
//     try {
//         const existingWorker = await Worker.findOne({ mobile });
//         if (existingWorker) {
//             if (file) {
//                 const filePath = path.join(urlFile, file.filename);
//                 fs.unlink(filePath, (err) => {
//                     if (err) console.error(`Error al eliminar la imagen cargada: ${err.message}`);
//                 });
//             }
//             return res.status(400).json({ message: 'El número de móvil ya está en uso por otro trabajador.' });
//         }

//         if (!file) {
//             return res.status(400).json({
//                 message: 'No se ha recibido ningún archivo.'
//             });
//         }

//         const fileUrl = `${ipFileServer}/${file.filename}`

//         const newWorker = new Worker({
//             name,
//             id,
//             motorcycleType,
//             mobile,
//             bloodType,
//             birthdate,
//             file: fileUrl
//         });
//         await newWorker.save();
//         res.status(201).json(newWorker);
//     } catch (error) {
//         if (file) {
//             fs.unlink(file.path, (err) => {
//                 if (err) console.error('Error al eliminar el archivo:', err);
//             });
//         }
//         res.status(500).json({ message: error.message });
//     }
// }

// const actualizarTrabajador = async (req, res) => {
//     const { mobile } = req.params;
//     const { newMobile, ...updateFields } = req.body;
//     const file = req.file

//     try {
//         const updatedWorker = await Worker.findOne({ mobile })
//         if (!updatedWorker) {
//             if (file){
//                 const newFilePath = path.join(urlFile, file.filename);
//                 fs.unlink(newFilePath, (err) => {
//                     if (err) {
//                         console.error(`Error al eliminar la nueva imagen: ${err.message}`);
//                     }
//                 });
//             }
//             return res.status(404).json({ message: 'Trabajador no encontrao' })
//         }

//         if (newMobile && newMobile !== mobile) {
//             const existingMobileWorker = await Worker.findOne({ mobile: newMobile });
//             if (existingMobileWorker) {
//                 return res.status(400).json({ message: 'El número de móvil ya está en uso por otro trabajador.' });
//             }
//             updatedWorker.mobile = newMobile;
//         }

//         const oldFilePath = updatedWorker.file ? path.join(urlFile, updatedWorker.file.split('/').pop()) : null

//         if (file) {
//             updatedWorker.file = `${ipFileServer}/${file.filename}`
//         }

//         Object.assign(updatedWorker, updateFields)

//         await updatedWorker.save()

//         if (oldFilePath) {
//             fs.unlink(oldFilePath, (err) => {
//                 if (err) {
//                     console.error(`Error al eliminar la imagen anterior: ${err.message}`);
//                 } else {
//                     console.log(`Imagen anterior eliminada: ${oldFilePath}`);
//                 }
//             });
//         }
//         res.json({ message: 'Trabajador actualizado' })

//     } catch (error) {
//         if (file) {
//             const newFilePath = path.join(__dirname, '../../uploads', file.filename);
//             fs.unlink(newFilePath, (err) => {
//                 if (err) {
//                     console.error(`Error al eliminar la nueva imagen: ${err.message}`);
//                 }
//             });
//         }
//         res.status(500).json({ message: error.message });
//     }
// };

// const eliminarTrabajador = async (req, res) => {
//     const { mobile } = req.params;

//     try {
//         const deleteWorker = await Worker.findOne({ mobile })
//         if (!deleteWorker) {
//             return res.status(404).json({ message: 'Trabajador no encontrado' });
//         }
//         if (deleteWorker.file) {
//             const filePath = path.join(__dirname, '../../uploads', deleteWorker.file.split('/').pop())
//             fs.unlink(filePath, (err) => {
//                 if (err) {
//                     res.json({ message: `error al eliminar la imagen: ${err.message}` });
//                 }
//             })
//         }
//         await Worker.findOneAndDelete({ mobile })
//         res.json({ message: 'Trabajador eliminado' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = {
    listarTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
};