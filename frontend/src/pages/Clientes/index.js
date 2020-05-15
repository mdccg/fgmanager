import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Clientes() {
  const Clientes = () => (
    <div className="clientes">
      <div>
        <div className="containerTitulo">
          <div className="titulo">
            <h2 >Clientes</h2>
          </div>
        </div>
        <div className="container">
          <div className="row alinhar">
            <div className="col-lg-4">
              <button type="button" class="float-right btn btn-warning btn-sm  ">Listar</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <label className="rotulo">Nome completo</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
              <label className="rotulo">Nº de CPF</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
              <label className="rotulo">Nº de RG</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <label className="rotulo">Telefone</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
            <label className="rotulo">Endereco eletronico</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
            <label className="rotulo">Rua</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
            <label className="rotulo">Nº de Rua</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
            <label className="rotulo">Bairro</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
            <label className="rotulo">Cidade</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>

          </div>
          <div className="row ">
            <div className="col-lg-4 ">
            <label className="rotulo">CEP</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4">
            <label className="rotulo">Ponto de referencia</label>
              <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="col-lg-4 botao">
              <button type="button" class=" btn btn-block btn-success ">ADICIONAR</button>
            </div>

          </div>
        </div>


      </div>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <Clientes />
    </div>
  );
}

export default Clientes;