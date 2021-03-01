import React, { Component } from 'react';

import TabelaCrud from './../../components/TabelaCrud';

import api from './../../services/api';

class Teste extends Component {
  state = {
    clientes: null,
    selecionado: {}
  };

  setSelecionado = selecionado => {
    this.setState({ selecionado: selecionado });
  }

  create = () => {
    
  }

  read = () => {
    alert(JSON.stringify(this.state.selecionado));
  }

  update = () => {
    alert(JSON.stringify(this.state.selecionado));
  }

  delete = () => {
    alert(JSON.stringify(this.state.selecionado));
  }

  async componentDidMount() {
    const clientes = (await api.get('/clientes')).data;
    this.setState({ clientes: clientes });
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
      </main>
    );
  }
}

export default Teste;