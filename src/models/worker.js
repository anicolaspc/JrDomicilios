const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true }, 
    motorcycleType: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    bloodType: { type: String, required: true },
    birthdate: { type: Date, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Worker', workerSchema);
