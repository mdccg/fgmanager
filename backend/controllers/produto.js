import Produto from './../models/produto';

class produto {
    novo(req, res) {
        try{
            
            var obj = {
                nome: req.body.nome,
                marca: req.body.marca,
                modelo: req.body.modelo,
                codigo: req.body.codigo
            }

            Produto.find({codigo: obj.codigo}, (erro, codigo) => {
                if(erro) {
                    return res.send({
                        mensagem: 'O banco de dados está inativo no momento.\nTente novamente mais tarde!',
                        erro: true
                    });
                }
                
                if(codigo.length > 0) {
                    return res.send({
                        mensagem: 'Um produto com o mesmo código já existe!',
                        erro: true
                    });
                }else{
                    Produto.create(obj).then((produto) => {
                        return res.send({
                            mensagem: 'Salvo com sucesso!',
                            error: false
                        });
                    }, (erro) => {
                        return res.send({
                            mensagem: 'Ocorreu um problema ao tentar salvar os dados: ' + erro,
                            error: true
                        });
                    }).catch((e) => {
                        return res.send({
                            mensagem: 'Ocorreu um erro de servidor: ' + erro,
                            error: true
                        });
                    });
                }
            });

        }catch(e) {
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