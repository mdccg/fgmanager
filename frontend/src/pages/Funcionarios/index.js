import React, { Component } from 'react';

import TabelaCrud from './../../components/TabelaCrud';

import api from './../../services/api';

import ModalDeCadastrar from '../../components/ModalDeCadastrar';
import ModalDeVisualizar from '../../components/ModalDeVizualizar';
import ModalDeEdicao from '../../components/ModalDeEdicao';
import ModalDeExcluir from '../../components/ModalDeExcluir';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';

import { constants } from './constants';

import "./styles.css";


class Funcionarios extends Component {

  state = {
    funcionarios: null,
    selecionado: {},
    editarSelecionado: {},
    abrirModalCadastrar: false,
    abrirModalVisualizar: false,
    abrirModalEditar: false,
    abrirModalErro: false,
    mensagemSucesso: null,
    mensagemErro: null,
  };

  toggleMensagemErro() {
    this.setState({ mensagemErro: null })
  }

  toggleMensagemSucesso() {
    this.setState({ mensagemSucesso: null })
  }

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

  async BuscarFuncionarios() {
    const funcionarios = (await api.get('/funcionarios')).data;
    this.setState({ funcionarios });
  }

  componentWillMount() {
    this.BuscarFuncionarios();
  }

  SalvarDados(e) {
    e.preventDefault();
    console.log(this.state.editarSelecionado)
    api.post('/funcionarios/editar', this.state.editarSelecionado)
      .then((sucesso) => {

        const { mensagem } = sucesso.data;
        console.log(mensagem)
        this.setState({ mensagemSucesso: mensagem, selecionado: this.state.editarSelecionado });
        this.BuscarFuncionarios();
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
    api.post('/funcionarios/remover', { id })
      .then((sucesso) => {
        const { mensagem } = sucesso.data;
        this.setState({ mensagemSucesso: mensagem, selecionado: {} });
        this.BuscarFuncionarios();
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


  render() {
    const { funcionarios: rows, selecionado } = this.state;

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
          setSelecionado={selecionado => this.setSelecionado(selecionado)}
        />

        <ModalDeCadastrar
          isOpen={this.state.abrirModalCadastrar}
          camposImput={constants.camposCadastro}
          toggle={this.create}
          atualizarLista={() => this.BuscarFuncionarios()}
          rotaDeCadastro="/funcionarios/novo"
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
          requiredInputs={{ nome: true, tipo: true, cpf: true, telefone: true, email: true }}
          inputEspecial={{ tipo: true }}
          inputEspecialList={{
            tipo: (required, campo, value, onChange, Capitalize) => {
              return (
                <div className="form-group">
                  <label className="rotulo">{Capitalize("tipo")}</label>
                  <span className={required ? "required-style" : "none-style"}>*</span>
                  <select
                    required={required}
                    name={campo}
                    value={value}
                    onChange={onChange}
                    className="browser-default custom-select"
                  >
                    <option value="">Escolha o tipo de funcionário</option>
                    <option value={"almoxerife"}>{Capitalize("almoxerife")}</option>
                    <option value={"tecnico"}>{Capitalize("técnico")}</option>
                  </select>
                </div>
              )
            }
          }}
        />

        <ModalDeExcluir
          isOpen={this.state.abrirModalErro}
          toggle={this.delete}
          mensagem='Tem certeza que deseja excluir o funcionário?'
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

export default Funcionarios;