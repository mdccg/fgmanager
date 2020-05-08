import Modelo from './../models/modelo';

class modelo {
    novo(req, res) {
        try {
            var obj = {
                nome: req.body.nome,
                marca: req.body.marca
            }

            Modelo.find({nome: obj.nome}, (erro, nome) => {
                if(erro) {
                    return res.send({
                        mensagem: 'O banco de dados está inativo no momento.\nTente novamente, mais tarde!',
                        erro: true
                    });
                }

                if(nome.length > 0) {
                    return res.send({
                        mensagem: 'Um modelo com o mesmo nome já existe!',
                        erro: true
                    });
                }else{
                    Modelo.create(obj).then((modelo) => {
                        res.send({
                            mensagem: 'Salvo com sucesso!',
                            error: false
                        });
                    }, (erro) => {
                        res.send({
                            mensagem: 'Ocorreu um problema ao tentar salvar os dados: ' + erro,
                            error: true
                        });
                    }).catch((e) => {
                        res.send({
                            mensagem: 'Ocorreu um erro de servidor: ' + erro,
                            error: true
                        });
                    });
                }
            });

        }catch(erro) {
            console.log('erro: ' + erro);
        } 
    }

    buscaTodos(req, res) {
        Modelo.find().then((modelo) => {
            res.send(modelo);
        }, (erro) => {
            res.send('Ocorreu um erro: ' + erro);
        }).catch((e) => {
            res.send('Ocorreu um erro interno no servidor: ' + e);
        })
    }
}

export default modelo;