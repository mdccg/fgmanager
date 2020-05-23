import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

import './style.css';
import api from './../../services/api';

class TabelaClientes extends Component {
    state = {
        listaCliente: [],
    };
    getModeloById = id => {
        try {
          return this.state.listaCliente.filter(listaCliente => listaCliente._id === id)[0].nome;
        
        } catch(exception) {
          console.error(
            'TesteDeAlonsoError: NÃO ALTERNE ENTRE AS TELAS TÃO RÁPIDO!\n'
          );
        }
      }
    
      async componentDidMount() {
        let listaCliente = await api.get('/clientes');
        
        this.setState({ listaCliente: listaCliente.data });
        
      }

    render() {
        const { listaCliente: rows } = this.state;
        const DatatablePage = () => {
            const data = {
                columns: [
                    {
                        label: 'Nome',
                        field: 'nome',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'CPF',
                        field: 'cpf',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'RG',
                        field: 'rg',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Telefone',
                        field: 'telefone',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Ações',
                        field: 'acoes',
                        sort: 'asc',
                        width: 100
                    },

                ],
                rows: rows
            };

            return (
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                    id="tabelaClientes"
                />
            );
        }
        return (
            <main>
                <section className="stacatto">
                    <div></div>

                    <h1>Clientes</h1>

                    <Link to="./../Clientes/">
                        <button className="novo">Novo Cliente+</button>
                    </Link>
                </section>

                <DatatablePage rows={rows} />
            </main>
        );
    }
}
export default TabelaClientes;