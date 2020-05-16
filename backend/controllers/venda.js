import Produto from './../models/produto';
import Venda from './../models/venda';

class venda {

    SalvarCompra(req, res) {
        var objeto = {
            funcionario: req.body.funcionario,
            produtos: req.body.produtos,
        }

        console.log(objeto)

        Venda.create(objeto)
            .then((_venda) => {
                Produto.remove({ _id: { $in: objeto.produtos } }, (err, _sucesso) => {
                    if (err) {
                        return res.status(500).json("Ocorreu um problema ao tentar finalizar venda.")
                    } else {
                        return res.status(200).json("Venda concluida com sucesso.")
                    }
                })
            },
                (erro) => {
                    return res.status(500).json('ocorreu um problema ao tentar salvar os dados: ' + erro)
                }).catch((e) => {
                    return res.status(500).json('ocorreu um erro de servidor: ' + e)
                })
    }

    busca(req, res) {
        var tipo = req.body.tipo;
        var valor = req.body.valor;
        Produto.find({ [tipo]: valor })
            .then((venda) => {
                return res.send(venda)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
    }

    //Para visualisar objeto com vetor
    buscaVendas(req, res) {
        Venda.find()
            .then((venda) => {
                return res.send(venda)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
            .catch((e) => {
                return res.send('erro interno no servidor: ' + e)
            })
    }
}
export default venda;