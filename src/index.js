const express = require('express');
const { static: fileServer } = require('express')
const { urlFile } = require('./config/constants')
const cors = require('cors');
const connectDB = require('./db/connection');
const workerRouter = require('./routes/worker.routes')
const authRouter = require('./routes/auth.routes')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/workers', workerRouter);
app.use('/api/auth', authRouter)
app.use('/api/files', fileServer(urlFile)) 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});