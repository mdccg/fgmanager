import React, { Component } from 'react';
import { MDBDataTable, MDBTableEditor } from 'mdbreact';
import { Link } from 'react-router-dom';

import './style.css';
import api from './../../services/api';

import ModalDeEdicao from '../../components/ModalDeEdicao';
import ModalDeVizualizar from '../../components/ModalDeVizualizar';
import ModalDeExcluir from '../../components/ModalDeExcluir';

class TabelaClientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mensagemEditar: null,
          mensagemVisualizar: null,
          mensagemExcluir: null,
          listaCliente: []
        }
      }
    
    toggleMensagemEditar() {
        this.setState({ mensagemEditar: null})
    }
    toggleMensagemVisualizar() {
        this.setState({ mensagemVisualizar: null })
    }
    toggleMensagemExcluir() {
        this.setState({ mensagemExcluir: null })
    }

    Editar(event){
        var conteudo = 'mensagem';
        event.preventDefault();
        this.setState({ mensagemEditar: conteudo });
    }
    Visualisar(event) {
        var conteudo = 'mensagem';
        event.preventDefault();
        this.setState({ mensagemVisualizar: conteudo });
    }
    Excluir(event) {
        var conteudo = 'Tem certeza que deseja excluir este cliente?';
        event.preventDefault();
        this.setState({ mensagemExcluir: conteudo });
    }
    getModeloById = id => {
        try {
            return this.state.listaCliente.filter(listaCliente => listaCliente._id === id)[0].nome;

        } catch (exception) {
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
            <main className="container-main-fgtelecom">
                <section className="stacatto">
                    <div></div>

                    <h1>Clientes</h1>

                    <Link to="./../Clientes/">
                        <button className="novo">Novo Cliente+</button>
                    </Link>
                </section>
                <div className="containerAcoe">
                    <button type="button" className="btn btn btn-warning" onClick={(event) => this.Editar(event)}> <i class="fas fa-edit"></i></button>
                    <button type="button" className="btn btn-primary " onClick={(event) => this.Visualisar(event)}><i class="far fa-eye"></i></button>
                    <button type="button" className="btn btn-danger " onClick={(event) => this.Excluir(event)}><i class="fas fa-trash-alt"></i></button>
                </div>


                <DatatablePage rows={rows} />
                <ModalDeEdicao mensagem={this.state.mensagemEditar} toggle={() => this.toggleMensagemEditar()} />
                <ModalDeVizualizar mensagem={this.state.mensagemVisualizar} toggle={() => this.toggleMensagemVisualizar()} />
                <ModalDeExcluir mensagem={this.state.mensagemExcluir} toggle={() => this.toggleMensagemExcluir()} />
            </main>
        );
    }
}
export default TabelaClientes;