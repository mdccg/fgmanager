import React, { Component } from 'react';

import TabelaCrud from '../../components/TabelaCrud';

import api from '../../services/api';

import ModalDeCadastrar from '../../components/ModalDeCadastrar';
import ModalDeVisualizar from '../../components/ModalDeVizualizar';
import ModalDeEdicao from '../../components/ModalDeEdicao';
import ModalDeExcluir from '../../components/ModalDeExcluir';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';

import { constants } from './constants';


class Clientes extends Component {
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
        api.post('/clientes/editar', this.state.editarSelecionado)
            .then((sucesso) => {

                const { mensagem } = sucesso.data;
                this.setState({ mensagemSucesso: mensagem, selecionado: this.state.editarSelecionado });
                this.BuscarClientes();
                this.update();
            })
            .catch(error => {
                const { mensagem } = error.response.data;
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
        var name = e.target.name
        var value = e.target.value

        if (name.indexOf("endereco") !== -1) {
            name = name.replace("endereco.", "");
            this.setState({ editarSelecionado: { ...this.state.editarSelecionado, endereco: { ...this.state.editarSelecionado.endereco, [name]: value } } })
            return
        }

        this.setState({ editarSelecionado: { ...this.state.editarSelecionado, [name]: value } })
    }

    render() {
        const { clientes: rows, selecionado } = this.state;

        const crud = {
            create: this.create,
            read: this.read,
            update: this.update,
            delete: this.delete,
        };

        const data = {
            columns: constants.columns,
            rows: rows
        };

        return (
            <main className="container-main-fgtelecom">
                <TabelaCrud
                    crud={crud}
                    data={data}
                    tuplas={rows}
                    identificador="cpf"
                    selecionado={selecionado}
                    setSelecionado={selecionado => this.setSelecionado(selecionado)} />

                <ModalDeCadastrar
                    isOpen={this.state.abrirModalCadastrar}
                    camposImput={constants.camposCadastro}
                    toggle={this.create}
                    atualizarLista={() => this.BuscarClientes()}
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
                    requiredInputs={{nome: true, cpf: true, rg: true, telefone: true, email: true}}
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

export default Clientes;