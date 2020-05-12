import Produto from './../models/produto';

class produto {
    novo(req, res) {
        try {

            var obj = {
                nome: req.body.nome,
                marca: req.body.marca,
                modelo: req.body.modelo,
                codigo: req.body.codigo
            }


            Produto.create(obj).then((_produto) => {
                return res.status(200).send({
                    mensagem: 'Salvo com sucesso!'
                });
            }, (erro) => {

                var dadoJaCadastrado = ''
                if (erro.errmsg.indexOf("codigo") !== -1) {
                    dadoJaCadastrado = "código"
                }

                if(erro.code === 11000) {
                    return res.status(500).send({
                        mensagem: 'O ' + dadoJaCadastrado + ' de produto já foi cadastrado.'
                    });    
                }

                return res.status(500).send({
                    mensagem: 'Ocorreu um problema ao tentar salvar os dados: ' + erro
                });
            }).catch((e) => {
                return res.status(201).send({
                    mensagem: 'Ocorreu um erro de servidor: ' + erro
                });
            });


        } catch (e) {
            console.log(e)
        }
    }

    buscaTodos(req, res) {
        Produto.find().then((produto) => {
            res.send(produto);
        }, (erro) => {
            res.send('Ocorreu um erro: ' + erro);
        }).catch((e) => {
            res.send('Ocorreu um erro interno no servidor: ' + e);
        })
    }
}

export default produto;