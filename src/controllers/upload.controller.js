const express = require('express');
const ipFile = require('../config/constants');

const upload = async (req, res, next) => {
    const { file } = req;

    try {
        if (!file) {
            return res.status(400).json({
                message: 'No se ha recibido ningún archivo.'
            });
        }

        return res.status(200).json({
            message: 'Archivo cargado',
            url: `${ipFile.ipFileServer}/${file.filename}`, 
            name: file.filename
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al cargar el archivo',
            error: error.message
        });
    }
};

module.exports = upload;
