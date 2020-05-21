import React, { Component } from 'react';
import './styles.css';

import ModalPage from './../../components/Modais/ModalPage';

import api from './../../services/api';

// function cadastrar(event) {
//   event.preventDefault();
  
//   const form = {
//     nome: document.getElementById("inome").value,
//     cpf: document.getElementById("icpf").value,
//     rg: document.getElementById("irg").value,
//     telefone: document.getElementById("itel").value,
//     email: document.getElementById("iemail").value,
//     endereco: {
//       rua: document.getElementById("irua").value,
//       numero: document.getElementById("inum_rua").value,
//       bairro: document.getElementById("ibairro").value,
//       cidade: document.getElementById("icidade").value,
//       cep: document.getElementById("icep").value,
//       pontoReferencia: document.getElementById("iponto_referencia").value,
//     }
//   }

 // api.post('/clientes/novo', form)
  //   .then((response) => {
  //     console.log(response.data.mensagem)
  //   })
  //   .catch(error => console.log(error.response));
  
// }


class Clientes extends Component {
  state = {
    modal: false,
    message: 'Deu pau...'
  };
  toggle = message => {
    this.setState({
      modal: !this.state.modal,
      message: message
    });

    setTimeout(() => {
      this.setState({ modal: !this.state.modal });

    }, 2000);
  }

  cadastrar(event) {
    event.preventDefault();
    
    const form = {
      nome: document.getElementById("inome").value,
      cpf: document.getElementById("icpf").value,
      rg: document.getElementById("irg").value,
      telefone: document.getElementById("itel").value,
      email: document.getElementById("iemail").value,
      endereco: {
        rua: document.getElementById("irua").value,
        numero: document.getElementById("inum_rua").value,
        bairro: document.getElementById("ibairro").value,
        cidade: document.getElementById("icidade").value,
        cep: document.getElementById("icep").value,
        pontoReferencia: document.getElementById("iponto_referencia").value,
      }
    }
  
     api.post('/clientes/novo', form)
    .then((response) => {
      console.log(response.data.mensagem)
    })
    .catch(
      error => this.toggle
      
      );
    
  }
  render() {
    return (
      <main>
        {/* <form onSubmit={(event) => cadastrar(event)}> */}
        <form onSubmit={event => this.cadastrar(event)}>
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
                    <button type="button" name="listar" id="ilistar" className="float-right btn btn-warning btn-sm  ">Listar</button>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <label className="rotulo">Nome completo</label>
                    <input type="text" name="nome" id="inome" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Nº de CPF</label>
                    <input type="text" name="cpf" id="icpf" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Nº de RG</label>
                    <input type="text" name="rg" id="irg" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <label className="rotulo">Telefone</label>
                    <input type="text" name="tel" id="itel" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">E-Mail</label>
                    <input type="text" name="email" id="iemail" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Rua</label>
                    <input type="text" name="rua" id="irua" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <label className="rotulo">Nº de Rua</label>
                    <input type="text" name="num_rua" id="inum_rua" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Bairro</label>
                    <input type="text" name="bairro" id="ibairro" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Cidade</label>
                    <input type="text" name="cidade" id="icidade" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>

                </div>
                <div className="row ">
                  <div className="col-lg-4 ">
                    <label className="rotulo">CEP</label>
                    <input type="text" name="cep" id="icep" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4">
                    <label className="rotulo">Ponto de referencia</label>
                    <input type="text" name="ponto_referencia" id="iponto_referencia" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
                  </div>
                  <div className="col-lg-4 botao">
                    <button type="submit" name="adicionar" id="iadicionar" className=" btn btn-block btn-success ">ADICIONAR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <ModalPage modal={this.state.modal} message={this.state.message}/>
      </main>
    );
  }
}

export default Clientes;