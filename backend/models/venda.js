var mongoose = require('mongoose');

var venda = new mongoose.Schema({
    funcionario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    datahora:{
        type: Date,
        default: new Date,
        required: true
    },
    produtos: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Venda', venda);