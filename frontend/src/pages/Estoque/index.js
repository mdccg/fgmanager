import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

import './styles.css';

import api from './../../services/api';

class Estoque extends Component {
  state = {
    produtos: [],
    modelos: []
  };

  getModeloById = id => {
    try {
      return this.state.modelos.filter(modelo => modelo._id === id)[0].nome;
    
    } catch(exception) {
      console.error(
        'TesteDeAlonsoError: NÃO ALTERNE ENTRE AS TELAS TÃO RÁPIDO!\n'
        + '\tat Estoque.getModeloById (index.js:16)\n'
        + '\tat CasaDoCaixaPrego.js (<anonymous>)\n'
        + '\tat QuintoDosInferno.ts (<anonymous>)\n'
        + '\tat LaOndeJudasPerdeuAsBotas.cs (baphomet.java:666)'
      );
    }
  }

  async componentDidMount() {
    let produtos = await api.get('/estoque/produto');
    let modelos = await api.get('/estoque/modelo');
    
    this.setState({ modelos: modelos.data });
    
    produtos.data.map(produto => produto.modelo = this.getModeloById(produto.modelo));
    
    this.setState({ produtos: produtos.data });
  }

  render() {
    const { produtos: rows } = this.state;

    const DatatablePage = () => {
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
        rows: rows
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