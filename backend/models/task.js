const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    tecnologia: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);




/**/