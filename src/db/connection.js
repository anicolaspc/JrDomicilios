const mongoose = require('mongoose');

let isConnected

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        isConnected = db.connections[0].readyState;
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
