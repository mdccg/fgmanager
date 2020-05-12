var mongoose = require('mongoose');

var modelo = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Modelo', modelo);