import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import api from './../../services/api';

const Form = props => (
  <div className="form">
    <form>
      <div className="row">
        <div className="col">
          <TextField name="codigoAparelho" id="outlined-basic" label="Código" variant="outlined" />
        </div>

        <div className="col">
          <TextField name="codigoSmartCard" id="outlined-basic" label="Smart card" variant="outlined" />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <TextField name="nome" id="outlined-basic" label="Nome" variant="outlined" />
        </div>

        <div className="col">
          <Autocomplete
            id="combo-box-demo"
            options={props.modelos.map(modelo => ({ title: modelo.nome, modelo: modelo._id }))}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} name="modelo" id="outlined-basic" label="Modelo" variant="outlined" />}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <TextField name="marca" id="outlined-basic" label="Marca" variant="outlined" />
        </div>

        <div className="col">
          <input type="submit" value="Adicionar" />
        </div>
      </div>
    </form>
  </div>
);

class CadastroProdutos extends Component {
  state = { modelos: [] };

  async componentDidMount() {
    const modelos = await api.get('/estoque/modelo');
    
    this.setState({ modelos: modelos.data });
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

        <Form modelos={modelos} />
      </main>
    );
  }
}

export default CadastroProdutos;