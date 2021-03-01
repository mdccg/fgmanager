import React, { Component } from 'react';

import TabelaCrud from '../../components/TabelaCrud';

import api from '../../services/api';

import ModalDeVisualizar from '../../components/ModalDeVizualizar';
import ModalDeExcluir from '../../components/ModalDeExcluir';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';

import { constants } from './constants';

import Modal from './component/Modal';

class Estoque extends Component {

  constructor(props) {
    super(props)
    this.key = 0;
  }

  state = {
    produtos: null,
    selecionado: {},
    editarSelecionado: {},
    abrirModal: false,
    abrirModalVisualizar: false,
    abrirModalEditar: false,
    abrirModalErro: false,
    mensagemSucesso: null,
    mensagemErro: null,
    optionsAutocomplete: {},
    action: "",
  };

  setSelecionado = selecionado => {
    this.setState({ selecionado: selecionado });
  }

  create = () => {
    this.setState({ abrirModal: !this.state.abrirModal, action: 'novo', });
  }

  read = () => {
    this.setState({ abrirModalVisualizar: !this.state.abrirModalVisualizar });
  }

  update = () => {
    if (!this.state.abrirModal) {
      this.setState({
        abrirModal: !this.state.abrirModal,
        action: 'editar',
        editarSelecionado: this.state.selecionado
      });
      return
    }

    this.setState({ abrirModal: !this.state.abrirModal, action: 'editar' });
  }

  delete = () => {
    this.setState({ abrirModalErro: !this.state.abrirModalErro });
  }

  toggleMensagemErro() {
    this.setState({ mensagemErro: null });
  }

  toggleMensagemSucesso() {
    this.setState({ mensagemSucesso: null });
  }

  async buscarProdutos() {
    const produtos = (await api.get('/estoque/produto')).data;
    this.setState({ produtos, editarSelecionado: {} });
  }

  componentDidMount() {
    this.buscarProdutos();
  }

  deletar() {
    const id = this.state.selecionado._id;
    api.post('/estoque/produto/remover', { id })
      .then(sucesso => {
        const { mensagem } = sucesso.data;
        this.setState({
          mensagemSucesso: mensagem,
          selecionado: {}
        });
        this.buscarProdutos();
        this.delete();
      })
      .catch(error => {
        const { mensagem } = error.response.data;
        this.setState({ mensagemErro: mensagem })
      });
  }

  render() {
    const {
      produtos: rows,
      selecionado,
      abrirModal,
      action
    } = this.state;

    const crud = {
      create: this.create,
      read: this.read,
      update: this.update,
      delete: this.delete
    };

    const data = {
      columns: constants.columns,
      rows: rows
    };

    console.log(action)

    return (
      <main className="container-main-fgtelecom">
        <TabelaCrud
          crud={crud}
          data={data}
          tuplas={rows}
          identificador="codigo"
          selecionado={selecionado}
          setSelecionado={selecionado => this.setSelecionado(selecionado)} />

        <Modal
          toggle={action === "novo" ? this.create : this.update}
          isOpen={abrirModal}
          atualizarLista={() => this.buscarProdutos()}
          data={this.state.editarSelecionado}
          dataOriginal={this.state.selecionado}
          action={action}
        />

        <ModalDeVisualizar
          toggle={this.read}
          data={this.state.selecionado}
          isOpen={this.state.abrirModalVisualizar} />

        {/* <ModalDeEdicao
          toggle={this.update}
          data={this.state.editarSelecionado}
          isOpen={this.state.abrirModalEditar}
          dataOriginal={this.state.selecionado}
          onChange={event => this.onChange(event)}
          salvarDados={event => this.salvarDados(event)}
          requiredInputs={{ nome: true, marca: true, modelo: true, codigo: true, smartCard: true }}
        /> */}

        <ModalDeExcluir
          toggle={this.delete}
          deletar={() => this.deletar()}
          isOpen={this.state.abrirModalErro}
          mensagem='Tem certeza que deseja excluir o produto?' />

        <ModalSucesso
          mensagem={this.state.mensagemSucesso}
          toggle={() => this.toggleMensagemSucesso()} />

        <ModalErro
          mensagem={this.state.mensagemErro}
          toggle={() => this.toggleMensagemErro()} />
      </main>
    );
  }
}

export default Estoque;