import Modelo from './../models/modelo';

class modelo {
    novo(req, res) {
        try {
            var obj = {
                nome: req.body.nome,
            }

            Modelo.create(obj).then((modelo) => {
                return res.status(200).send({
                    mensagem: 'Salvo com sucesso!'
                });
            }, (erro) => {
                if(erro.code === 11000) {
                    return res.status(500).send({
                        mensagem: 'Modelo já cadastrado.'
                    });
                }
                return res.status(500).send({
                    mensagem: 'Ocorreu um problema ao tentar salvar o modelo. Tente novamente.'
                });
            }).catch((e) => {
                return res.status(201).send({
                    mensagem: 'Ocorreu um erro de servidor.'
                });
            });

        } catch (erro) {
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