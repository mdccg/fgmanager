import React, { Component } from 'react';

import TabelaCrud from './../../components/TabelaCrud';

import api from './../../services/api';

import ModalDeCadastrar from '../../components/ModalDeCadastrar';
import ModalDeVisualizar from '../../components/ModalDeVizualizar';
import ModalDeEdicao from '../../components/ModalDeEdicao';
import ModalDeExcluir from '../../components/ModalDeExcluir';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';

import "./styles.css"


class Funcionarios extends Component {

  // constructor(props) {
  //   super(props);

  //   this.read = this.read.bind()
  // }

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
    api.post('/funcionarios/editar', this.state.editarSelecionado)
      .then((sucesso) => {
        const { mensagem } = sucesso.data;
        this.setState({ mensagemSucesso: mensagem });
        this.BuscarFuncionarios();
        this.update();
      })
      .catch(error => {
        const { mensagem } = error.response.data;
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
    console.log(e.target.value)
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
        name: "senha",
        type: "password",
        required: true
      },
      {
        name: "confirmar.Senha",
        type: "password",
        required: true
      },
      {
        name: "tipo",
        type: "select",
        descricao: "Escolha o tipo de funcionário",
        required: true,
        options: ["almoxarife", "técnico"]
      },
      {
        name: "cpf",
        type: "text",
        required: true
      },
      {
        name: "rg",
        type: "text",
        required: false
      },
      {
        name: "telefone",
        type: "text",
        required: false
      },
      {
        name: "email",
        type: "text",
        required: true
      },
      // Se precisar de campos para endereco, tem abaixo o modelo, o componente de modal já aceita esse modelo.
      // {
      //   name: "endereco",
      //   camposDeEndereco: [
      //     {
      //       name: "rua",
      //       type: "text"
      //     },
      //     {
      //       name: "numero",
      //       type: "text"
      //     },
      //     {
      //       name: "bairro",
      //       type: "text"
      //     },
      //     {
      //       name: "cidade",
      //       type: "text"
      //     },
      //     {
      //       name: "cep",
      //       type: "text"
      //     },
      //     {
      //       name: "ponto.Referencia",
      //       type: "text"
      //     },
      //   ]
      // }
    ]

    return camposImput
  }

  render() {
    const { funcionarios, selecionado } = this.state;

    const crud = {
      create: this.create,
      read: this.read,
      update: this.update,
      delete: this.delete,
    };

    const rows = funcionarios;

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
          tuplas={funcionarios}
          identificador="cpf"
          selecionado={selecionado}
          setSelecionado={selecionado => this.setSelecionado(selecionado)}
        />

        <ModalDeCadastrar
          isOpen={this.state.abrirModalCadastrar}
          camposImput={this.camposCadastro()}
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
          salvarDados={() => this.SalvarDados()}
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