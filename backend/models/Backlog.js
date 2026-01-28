const mongoose = require('mongoose');

const backlogSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    tecnologia: {
        type: String,
        required: true
    },
    fechaEliminacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Backlog', backlogSchema);