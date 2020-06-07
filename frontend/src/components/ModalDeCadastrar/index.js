import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './index.css';

import api from './../../services/api';

import ModalErro from '../../components/ModalErro';
import ModalSucesso from '../../components/ModalSucesso';

class ModalDeVizualizar extends Component {

  state = {
    inputs: null,
    mensagemSucesso: null,
    mensagemErro: null,
    data: []
  }

  toggleMensagemErro() {
    this.setState({ mensagemErro: null })
  }

  toggleMensagemSucesso() {
    this.setState({ mensagemSucesso: null })
  }

  reorganizarCampos(dados) {
    const dadosReorganizados = {}

    for (var campo in dados) {

      if (campo === "endereco") {
        var dadosEndereco = dados[campo];

        for (var camposEndereco in dadosEndereco) {
          dadosReorganizados[campo] = { ...dadosReorganizados[campo], [camposEndereco]: dadosEndereco[camposEndereco].value }
        }
        continue
      }

      dadosReorganizados[campo] = dados[campo].value

    }
    return dadosReorganizados
  }

  SalvarDados(e) {

    e.preventDefault()

    const dados = this.reorganizarCampos(this.state.data)

    api.post('/funcionarios/novo', dados)
      .then((sucesso) => {
        const { mensagem } = sucesso.data;
        this.setState({ mensagemSucesso: mensagem });
        this.props.atualizarLista();
        this.props.toggle();
      })
      .catch(error => {
        const { mensagem } = error.response.data;
        this.setState({ mensagemErro: mensagem });
      });
  }

  createStates() {
    var camposImput = this.props.camposImput
    var setState = {}
    var endereco = {}
    for (var key in camposImput) {
      if (camposImput[key].name === "endereco") {
        for (var i in camposImput[key].camposDeEndereco) {
          endereco = { ...endereco, [camposImput[key].camposDeEndereco[i].name]: { value: "", type: camposImput[key].camposDeEndereco[i].type, required: camposImput[key].camposDeEndereco[i].required} }
        }
        continue;
      }
      setState = { ...setState, [camposImput[key].name]: { value: "", type: camposImput[key].type, required: camposImput[key].required } };
    }

    setState.endereco = endereco;

    this.setState({ data: setState });
  }

  onChange(e) {
    var name = e.target.name
    var value = e.target.value

    if (name.indexOf("endereco") !== -1) {
      name = name.split(".");
      this.setState({ data: { ...this.state.data, endereco: { ...this.state.data.endereco, [name[1]]: { ...this.state.data.endereco[name[1]], value: value } } } },
        () => this.carregarInputs())
      return
    }

    this.setState({ data: { ...this.state.data, [name]: { ...this.state.data[name], value: value } } },
      () => this.carregarInputs())
  }

  carregarInputs() {
    var inputs = []
    var camposImput = this.state.data

    for (var campo in camposImput) {
      if (campo === "endereco") {
        for (var campoEndereco in camposImput[campo]) {
          var camposImputEderenco = camposImput[campo]
          inputs.push((
            <div className="form-group">
              <label className="rotulo">{campoEndereco === "pontoReferencia" ? "ponto de referência".toUpperCase() : campoEndereco.toUpperCase()}</label>
              <span className={this.state.data[campo].required ? "required-style" : ""}>*</span>    
              <input
                type={camposImputEderenco[campoEndereco].type}
                name={"endereco." + campoEndereco}
                id={campoEndereco}
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.data[campo][campoEndereco].value}
                onChange={(e) => this.onChange(e)}
                required={camposImputEderenco[campoEndereco].required}
              />
            </div>
          ))
        }

        continue;
      }

      inputs.push((
        <div className="form-group">
          <label className="rotulo">{campo.toUpperCase()}</label>
          <span className={this.state.data[campo].required ? "required-style" : ""}>*</span>
          <input
            type={camposImput[campo].type}
            name={campo}
            id={campo}
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={this.state.data[campo].value}
            onChange={(e) => this.onChange(e)}
            required={this.state.data[campo].required}
          />
        </div>
      ))
    }

    this.setState({ inputs })
  }

  componentWillReceiveProps() {
    this.createStates();
    this.carregarInputs();
  }

  renderizarCamposImput() {
    var campos = (<div></div>);
    if (this.state.inputs !== null) {
      campos = this.state.inputs.map((input, key) => {
        return <div value={key}>{input}</div>
      })
    }

    return campos
  }

  render() {

    return (
      <main>
        <MDBModal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}>
          <MDBModalHeader toggle={() => this.props.toggle()} className="modal-header-cadastrar-background"> <i class="fas fa-plus-circle"></i> Casdastrar </MDBModalHeader>
          <form onSubmit={(e) => this.SalvarDados(e)}>
            <MDBModalBody className="barra-de-rolagem">

              {this.renderizarCamposImput()}
            </MDBModalBody>
            <MDBModalFooter className="footer-modal-default-system">
              {/* <MDBBtn color="danger" size="sm" onClick={() => this.props.toggle()}>Cancelar</MDBBtn> */}
              <MDBBtn color="" style={{ background: "#61CA52", color: "white" }} size="sm" type="submit">Salvar</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>

        <ModalSucesso mensagem={this.state.mensagemSucesso} toggle={() => this.toggleMensagemSucesso()} />
        <ModalErro mensagem={this.state.mensagemErro} toggle={() => this.toggleMensagemErro()} />
      </main>
    );
  }
}

export default ModalDeVizualizar;