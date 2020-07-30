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

class Estoque extends Component {
  
  state = {
    produtos: null,
    selecionado: {},
    editarSelecionado: {},
    abrirModalCadastrar: false,
    abrirModalVisualizar: false,
    abrirModalEditar: false,
    abrirModalErro: false,
    mensagemSucesso: null,
    mensagemErro: null
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
    if (!this.state.abrirModalEditar)
      this.setState({ editarSelecionado: this.state.selecionado });

    this.setState({ abrirModalEditar: !this.state.abrirModalEditar });
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
    this.setState({ produtos });
  }

  componentWillMount() {
    this.buscarProdutos();
  }

  salvarDados(event) {
    event.preventDefault();

    api.post('/estoque/produto/editar', this.state.editarSelecionado)
      .then(sucesso => {
        const { mensagem } = sucesso.data;
        this.setState({
          mensagemSucesso: mensagem,
          selecionado: this.state.editarSelecionado
        });
        this.buscarProdutos();
        this.update();
      })
      .catch(error => {
        const { mensagem } = error.response.data;
        this.setState({ mensagemErro: mensagem });
      });
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

  onChange(event) {
    var name = event.target.name;
    var value = event.target.value;

    this.setState({
      editarSelecionado: {
        ...this.state.editarSelecionado,
        [name]: value
      }
    });
  }

  render() {
    const { produtos: rows, selecionado } = this.state;

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


    return (
      <main className="container-main-fgtelecom">
        <TabelaCrud
          crud={crud}
          data={data}
          tuplas={rows}
          identificador="codigo"
          selecionado={selecionado}
          setSelecionado={selecionado => this.setSelecionado(selecionado)} />
        
        <ModalDeCadastrar
          toggle={this.create}
          camposImput={constants.camposCadastro}
          rotaDeCadastro="/estoque/produto/novo"
          isOpen={this.state.abrirModalCadastrar}
          atualizarLista={() => this.buscarProdutos()} />

        <ModalDeVisualizar
          toggle={this.read}
          data={this.state.selecionado}
          isOpen={this.state.abrirModalVisualizar} />

        <ModalDeEdicao
          toggle={this.update}
          data={this.state.editarSelecionado}
          isOpen={this.state.abrirModalEditar}
          dataOriginal={this.state.selecionado}
          onChange={event => this.onChange(event)}
          salvarDados={event => this.salvarDados(event)}
          requiredInputs={{nome: true, marca: true, modelo: true, codigo: true, smartCard: true}}
        />

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