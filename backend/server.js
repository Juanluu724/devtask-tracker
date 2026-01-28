const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 🔹 IMPORTANTE
const Task = require('./models/task');
require('dotenv').config();

const app = express();
const PORT = 3000;

// 🔹 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔹 CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// 🔹 RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send('Servidor DevTask Tracker funcionando');
});

// =======================
// API TASKS (SEGÚN PDF)
// =======================

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    Task.find()
        .then(tareas => res.status(200).json(tareas))
        .catch(() => res.status(500).json({ error: 'Error obteniendo tareas' }));
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const { titulo, tecnologia } = req.body;

    if (!titulo || !tecnologia) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevaTarea = new Task({ titulo, tecnologia });

    nuevaTarea.save()
        .then(tarea => res.status(201).json(tarea))
        .catch(() => res.status(500).json({ error: 'Error creando tarea' }));
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(tarea => {
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            res.status(200).json({ message: 'Tarea eliminada' });
        })
        .catch(() => res.status(500).json({ error: 'Error eliminando tarea' }));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});