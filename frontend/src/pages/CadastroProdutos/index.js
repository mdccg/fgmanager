import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import api from './../../services/api';

class CadastroProdutos extends Component {
  state = {
    modelos: []
  };

  cadastrar = event => {
    event.preventDefault();

    const atributos = ['nome', 'marca', 'modelo', 'codigo', 'smartCard'],
        { modelos } = this.state,
          produto = {};
    
    for(const atributo of atributos)
      produto[atributo] = event.target[atributo].value;

    const modelo = modelos.filter(modelo => modelo.nome === produto.modelo)[0];
    
    produto.modelo = modelo._id;

    api.post('/estoque/produto/novo', produto)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  async componentDidMount() {
    const response = await api.get('/estoque/modelo');
    
    this.setState({ modelos: response.data });
  }

  render() {
    const { modelos } = this.state;

    return (
      <main className="cadastro-produtos">
        <section className="cabecalho">
          <div style={{ padding: '.25em .5em .25em' }}></div>
          
          <h1>Cadastro de produto</h1>

          <Link to="/estoque">
            <button className="listar">Listar</button>
          </Link>
        </section>

        <div className="form">
          <form onSubmit={event => this.cadastrar(event)}>
            <div className="row">
              <div className="col">
                <TextField name="codigo" id="outlined-basic" label="Código" variant="outlined" required />
              </div>

              <div className="col">
                <TextField name="smartCard" id="outlined-basic" label="Smart card" variant="outlined" required />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextField name="nome" id="outlined-basic" label="Nome" variant="outlined" required />
              </div>

              <div className="col">
                <Autocomplete
                  id="combo-box-demo"
                  options={modelos.map(modelo => ({ nome: modelo.nome, _id: modelo._id }))}
                  getOptionLabel={(option) => option.nome}
                  renderInput={(params) => <TextField {...params} name="modelo" id="outlined-basic" label="Modelo" variant="outlined" required />}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextField name="marca" id="outlined-basic" label="Marca" variant="outlined" required />
              </div>

              <div className="col">
                <input type="submit" value="Adicionar" />
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default CadastroProdutos;