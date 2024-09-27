const express = require('express');
const router = express.Router();
const {
    listarTrabajadores,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
} = require('../controllers/worker.controller');

router.get('/', listarTrabajadores);
router.post('/', crearTrabajador);
router.put('/:mobile', actualizarTrabajador);
router.delete('/:mobile', eliminarTrabajador); 

module.exports = router;
