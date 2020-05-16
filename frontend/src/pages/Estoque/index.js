import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import { MDBDataTable } from 'mdbreact';

import api from './../../services/api';

const DatatablePage = props => {
  const data = {
    columns: [
      {
        label: 'Código',
        field: 'codigo',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nome',
        field: 'nome',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Marca',
        field: 'marca',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Modelo',
        field: 'modelo',
        sort: 'asc',
        width: 100
      },
      {
        label: 'CRUD',
        field: 'crud',
        sort: 'asc',
        width: 100
      }
    ],
    rows: props.rows
  };


  return (
    <MDBDataTable
      hover
      striped
      bordered
      responsive
      data={data}
      id="estoque" />
  );
}

class Estoque extends Component {
  state = {
    produtos: []
  };

  async componentDidMount() {
    const response = await api.get('/estoque/produto');
    
    this.setState({ produtos: response.data });
  }

  render() {
    const { produtos: rows } = this.state;

    return (
      <main className="estoque">
        <section className="stacatto">
          <div></div>

          <h1>Estoque</h1>

          <Link to="/estoque/novo">
            <button className="novo">Novo +</button>
          </Link>
        </section>

        <DatatablePage rows={rows} />
      </main>
    );
  }
}

export default Estoque;