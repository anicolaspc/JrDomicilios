const express = require('express');
const router = express.Router();
const {
    listarTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
} = require('../controllers/worker.controller');
const multerUpload = require('../middleware/multer')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', listarTrabajadores);
router.post('/', authMiddleware, multerUpload.single('file'), crearTrabajador);
router.put('/:mobile', authMiddleware, multerUpload.single('file'), actualizarTrabajador);
router.delete('/:mobile', authMiddleware, eliminarTrabajador); 

module.exports = router;
