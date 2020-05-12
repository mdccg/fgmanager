import Cliente from '../models/clientes'
import validator from 'validator'
import validarDados from '../functions/validarDados'

class clientes {

    // eslint-disable-next-line class-methods-use-this
    novo(req, res) {
        try {
            var data = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                rg: req.body.rg,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco: req.body.endereco
            }

            for (var key in data) {
                console.log(key)
                if (key !== 'endereco') {
                    if (data[key] === '' || data[key] === undefined || data[key] === null) {
                        return res.status(500).send({
                            mensagem: 'Por favor preencha o campo ' + key + '!',
                            dadosForm: data
                        })
                    }
                }
            }

            for (var key in data) {
                if (typeof data[key] === "string") {
                    data[key] = data[key].trim()
                }

                if (typeof data[key] === "object") {
                    for (var i in data[key]) {
                        if (typeof data[key][i] === "string") {
                            data[key][i] = data[key][i].trim()
                        }
                    }
                }
            }

            var result = validarDados(data)
            for (var i in result) {
                if (result[i] == false) {
                    return res.status(500).send({
                        mensagem: i + ' inválido',
                        dadosForm: data
                    })
                }
            }


            Cliente.create(data)
                .then((cliente) => {
                    return res.status(200).send({
                        mensagem: 'salvo com sucesso!',
                    })
                },
                    (erro) => {
                        console.log(erro)
                        if(erro.code === 11000) {
                            
                            var dadoJaCadastrado = ''
                            if(erro.errmsg.indexOf("cpf") !== -1) {
                                dadoJaCadastrado = "cpf"
                            }
                            
                            if(erro.errmsg.indexOf("rg") !== -1) {
                                dadoJaCadastrado = "rg"
                            }
                            
                            if(erro.errmsg.indexOf("telefone") !== -1) {
                                dadoJaCadastrado = "telefone"
                            }
                            
                            if(erro.errmsg.indexOf("email") !== -1) {
                                dadoJaCadastrado = "email"
                            }

                            return res.status(500).send({
                                mensagem: 'O ' + dadoJaCadastrado + " já foi cadastrado.",
                                dadosForm: data
                            })
                        }

                        return res.status(500).send({
                            mensagem: 'ocorreu um problema ao tentar salvar os dados: ' + erro,
                            dadosForm: data
                        })
                    })
                .catch((e) => {
                    return res.status(500).send({
                        mensagem: 'ocorreu um erro de servidor: ' + e,
                        dadosForm: data
                    })
                })

        } catch (e) {
            console.log(e)
        }
    }

    // eslint-disable-next-line class-methods-use-this
    buscaTodos(req, res) {
        Cliente.find()
            .then((clientes) => {
                return res.send(clientes)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
            .catch((e) => {
                return res.send('erro interno no servidor: ' + e)
            })
    }

    editar(req, res) {
        try {
            var data = req.body

            Cliente.find({ cpf: data.cpf }, (erro, cpf) => {

                if ((cpf.length == 0 || (cpf[0].id === data.id && cpf.length == 1)) && erro == undefined) {
                    Cliente.find({ rg: data.rg }, (erro, rg) => {
                        if ((rg.length == 0 || (rg[0].id === data.id && rg.length == 1)) && erro == undefined) {
                            Cliente.find({ telefone: data.telefone }, (erro, telefone) => {
                                if ((telefone.length == 0 || (telefone[0].id == data.id && telefone.length == 1)) && erro == undefined) {
                                    Cliente.findByIdAndUpdate(data.id, data).exec()
                                        .then((cliente) => {
                                            res.send({ erro: false, mensagem: 'Cliente editado com sucesso!' })
                                        }, (erro) => {
                                            console.log(erro)
                                            res.status(500).send({ erro: true, mensagem: 'Falha ao tentar editar cliente!' })
                                        })
                                } else {
                                    return res.send({
                                        mensagem: 'Esse Telefone já está cadastrado!',
                                        erro: true
                                    })
                                }
                            })
                        } else {
                            return res.send({
                                mensagem: 'Esse RG já está cadastrado!',
                                erro: true
                            })
                        }
                    })
                } else {
                    return res.send({
                        mensagem: 'Esse CPF já está cadastrado!',
                        erro: true,
                        cpf: cpf
                    })
                }
            })

        } catch (e) {
            res.send({ erro: true, mensagem: e })
        }
    }

    remover(req, res) {
        const id = req.body.id
        Cliente.findByIdAndRemove(id, (err, sucesso) => {
            if (err) {
                return res.send({ erro: true, mensagem: 'Ocorreu um erro ao tentar excuir cliente!' })
            } else {
                return res.send({ erro: false, mensagem: 'Cliente excluido com sucesso!' })
            }
        })
    }
}

export default clientes;