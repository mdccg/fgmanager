var mongoose = require('mongoose');

var cliente = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    rg: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    endereco: {
        rua: {
            type: String,
            required: false
        },
        numero: {
            type: Number,
            required: false
        },
        bairro: {
            type: String,
            required: false
        },
        cidade: {
            type: String,
            required: false
        },
        cep: {
            type: String,
            required: false
        },
        pontoReferencia: {
            type: String,
            required: false
        }
    }
})

module.exports = mongoose.model('Cliente', cliente);