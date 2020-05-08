var mongoose = require('mongoose');

var produto = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Produto', produto);