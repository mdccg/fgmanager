var mongoose = require('mongoose');

var produto = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
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
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    smartCard: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Produto', produto);