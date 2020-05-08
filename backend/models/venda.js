var mongoose = require('mongoose');

var venda = new mongoose.Schema({
    funcionario:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    data:{
        type: String,
        required: true
    },
    produtos: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Venda', venda);