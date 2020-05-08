import validator from 'validator'

export default function(dados) {
    var resultValidacao = {}
    for(var key in dados) {
        switch (key) {
            case 'cpf':
                resultValidacao[key] = validaCPF(dados[key])
                break;
            
            case 'email':
                resultValidacao[key] = validaEmail(dados[key])
                break;
            
            case 'rg':
                resultValidacao[key] = validaRG(dados[key])
                break;
        }   
    }
    return resultValidacao
}

var validaCPF = (cpf) => {
    var numMultiplica = 10
    var soma = 0
    for(var i = 0; i <= cpf.length -3; i++) {
        var result = cpf[i] * numMultiplica
        soma += result
        numMultiplica--
    }
    var divisaoResto = (soma * 10) % 11
    if(divisaoResto === 10 || divisaoResto === 11) {
        divisaoResto = 0
    }
    if(divisaoResto == cpf[9]) {
        numMultiplica = 11
        soma = 0
        for(var i = 0; i <= cpf.length -2; i++) {
            var result = cpf[i] * numMultiplica
            soma += result
            numMultiplica--
        }
        divisaoResto = (soma * 10) % 11
        if(divisaoResto === 10 || divisaoResto === 11) {
            divisaoResto = 0
        }
        if(divisaoResto == cpf[10]) {
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

var validaEmail = (email) => {
    if(validator.isEmail(email)) {
        return true
    }else{
        return false
    }
}

var validaRG = (rg) => {
    for(var i in rg) {
        if(!validator.isNumeric(rg[i])) {
            if(rg[i] !== 'x' && rg[i] !== 'X'){
                return false
            }
        }
    }
    return true
}