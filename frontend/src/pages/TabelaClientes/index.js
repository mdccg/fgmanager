import React, { Component } from 'react';

import TabelaCrud from './../../components/TabelaCrud';

import api from './../../services/api';

import ModalDeCadastrar from '../../components/ModalDeCadastrar';
import ModalDeVisualizar from '../../components/ModalDeVizualizar';
import ModalDeEdicao from '../../components/ModalDeEdicao';
import ModalDeExcluir from '../../components/ModalDeExcluir';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';


class Teste extends Component {
    state = {
        clientes: null,
        selecionado: {},
        editarSelecionado: {},
        abrirModalCadastrar: false,
        abrirModalVisualizar: false,
        abrirModalEditar: false,
        abrirModalErro: false,
        mensagemSucesso: null,
        mensagemErro: null,
    };

    setSelecionado = selecionado => {
        this.setState({ selecionado: selecionado });
    }

    create = () => {
        this.setState({ abrirModalCadastrar: !this.state.abrirModalCadastrar });
    }

    read = () => {
        this.setState({ abrirModalVisualizar: !this.state.abrirModalVisualizar });
    }

    update = () => {
        if (!this.state.abrirModalEditar) {
            this.setState({ editarSelecionado: this.state.selecionado });
        }

        this.setState({ abrirModalEditar: !this.state.abrirModalEditar });
    }

    delete = () => {
        this.setState({ abrirModalErro: !this.state.abrirModalErro });
    }
    toggleMensagemErro() {
        this.setState({ mensagemErro: null })
    }

    toggleMensagemSucesso() {
        this.setState({ mensagemSucesso: null })
    }


    async BuscarClientes() {
        const clientes = (await api.get('/clientes')).data;
        this.setState({ clientes });
    }

    componentWillMount() {
        this.BuscarClientes();
    }

    SalvarDados(e) {
        e.preventDefault();
        console.log(this.state.editarSelecionado)
        api.post('/clientes/editar', this.state.editarSelecionado)
            .then((sucesso) => {

                const { mensagem } = sucesso.data;
                console.log(mensagem)
                this.setState({ mensagemSucesso: mensagem, selecionado: this.state.editarSelecionado });
                this.BuscarClientes();
                this.update();
            })
            .catch(error => {
                const { mensagem } = error.response.data;
                console.log(error)
                this.setState({ mensagemErro: mensagem });
            });
    }
    deletar() {
        const id = this.state.selecionado._id;
        api.post('/clientes/remover', { id })
            .then((sucesso) => {
                const { mensagem } = sucesso.data;
                this.setState({ mensagemSucesso: mensagem, selecionado: {} });
                this.BuscarClientes();
                this.delete();
            })
            .catch(error => {
                const { mensagem } = error.response.data;
                this.setState({ mensagemErro: mensagem })
            });
    }

    onChange(e) {
        var value = e.target.value;
        var key = e.target.name;
        this.setState({ editarSelecionado: { ...this.state.editarSelecionado, [key]: value } })
    }
    camposCadastro() {
        var camposImput = [
            {
                name: "nome",
                type: "text",
                required: true
            },        
            {
                name: "cpf",
                type: "text",
                required: true
            },
            {
                name: "rg",
                type: "text",
                required: true
            },

            {
                name: "telefone",
                type: "text",
                required: false
            },
            {
                name: "email",
                type: "email",
                required: true
            },
            {
              name: "endereco",
              camposDeEndereco: [
                {
                  name: "rua",
                  type: "text"
                },
                {
                  name: "numero",
                  type: "text"
                },
                {
                  name: "bairro",
                  type: "text"
                },
                {
                  name: "cidade",
                  type: "text"
                },
                {
                  name: "cep",
                  type: "text"
                },
                {
                  name: "ponto.Referencia",
                  type: "text"
                },
              ]
            }
        ]

        return camposImput
    }

    render() {
        const { clientes, selecionado } = this.state;

        const crud = {
            create: this.create,
            read: this.read,
            update: this.update,
            delete: this.delete,
        };

        const rows = clientes;

        const data = {
            columns: [
                {
                    label: '№ de CPF',
                    field: 'cpf',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Nome',
                    field: 'nome',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Endereço eletrônico',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Telefone',
                    field: 'telefone',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: rows
        };

        return (
            <main className="container-main-fgtelecom">
                <TabelaCrud
                    crud={crud}
                    data={data}
                    tuplas={clientes}
                    identificador="cpf"
                    selecionado={selecionado}
                    setSelecionado={selecionado => this.setSelecionado(selecionado)} />

                <ModalDeCadastrar
                    isOpen={this.state.abrirModalCadastrar}
                    camposImput={this.camposCadastro()}
                    toggle={this.create}
                    atualizarLista={() => this.BuscarFuncionarios()}
                    rotaDeCadastro="/clientes/novo"
                />

                <ModalDeVisualizar
                    isOpen={this.state.abrirModalVisualizar}
                    data={this.state.selecionado}
                    toggle={this.read}
                />

                <ModalDeEdicao
                    onChange={(e) => this.onChange(e)}
                    isOpen={this.state.abrirModalEditar}
                    data={this.state.editarSelecionado}
                    dataOriginal={this.state.selecionado}
                    toggle={this.update}
                    salvarDados={(e) => this.SalvarDados(e)}
                />

                <ModalDeExcluir
                    isOpen={this.state.abrirModalErro}
                    toggle={this.delete}
                    mensagem='Tem certeza que deseja excluir o cliente?'
                    deletar={() => this.deletar()}
                />

                <ModalSucesso
                    mensagem={this.state.mensagemSucesso}
                    toggle={() => this.toggleMensagemSucesso()}
                />

                <ModalErro
                    mensagem={this.state.mensagemErro}
                    toggle={() => this.toggleMensagemErro()}
                />
            </main>
        );
    }
}

export default Teste;