const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/connection');
const workerRouter = require('./src/routes/worker.routes')
const authRouter = require('./src/routes/auth.routes')

require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.redirect('/api/workers');
});
app.use('/api/workers', workerRouter);
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});

module.exports = app;