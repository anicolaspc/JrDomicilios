const express = require('express');
const { static: fileServer } = require('express')
const { urlFile } = require('./config/constants')
const cors = require('cors');
const connectDB = require('./db/connection');
const uploadRouter = require('./routes/upload.routes')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/workers', require('./routes/worker.routes'));

app.use('/api/files', fileServer(urlFile))

app.use('/api', uploadRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
