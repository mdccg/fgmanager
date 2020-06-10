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

import FirstLetterUpperCase from '../../funtions/firstLetterUpperCase';

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
      campo = campo;
      console.log(campo)

      if(campo === "senha" || campo === "confirmar.Senha") {
        if(dados['senha'].value !== dados['confirmar.Senha'].value) {
          return this.setState({mensagemErro: "As senhas têm que ser idênticas"});
        }

        if(campo === "confirmar.Senha") {
          continue
        }
      }

      if (campo.toLocaleLowerCase() === "endereco") {
        var dadosEndereco = dados[campo];

        for (var camposEndereco in dadosEndereco) {
          dadosReorganizados[campo] = { ...dadosReorganizados[campo], [camposEndereco.replace(/\./g, "")]: dadosEndereco[camposEndereco].value }
        }
        continue
      }

      dadosReorganizados[campo.replace(/\./g, "")] = dados[campo].value
    }
    return dadosReorganizados
  }

  SalvarDados(e) {
    e.preventDefault()

    const dados = this.reorganizarCampos(this.state.data)
    console.log(dados)
    api.post(this.props.rotaDeCadastro, dados)
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
          endereco = { ...endereco, [camposImput[key].camposDeEndereco[i].name]: { value: "", type: camposImput[key].camposDeEndereco[i].type, required: camposImput[key].camposDeEndereco[i].required } }
        }
        continue;
      }
      setState = { ...setState, [camposImput[key].name]: { value: "", type: camposImput[key].type, required: camposImput[key].required, descricao: camposImput[key].descricao, options: camposImput[key].options } };
    }

    setState.endereco = endereco;

    this.setState({ data: setState });
  }

  onChange(e) {
    var name = e.target.name
    var value = e.target.value

    if (name.indexOf("endereco") !== -1) {
      name = name.replace("endereco.", "");
      this.setState({ data: { ...this.state.data, endereco: { ...this.state.data.endereco, [name]: { ...this.state.data.endereco[name], value: value } } } },
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
              <label className="rotulo">{FirstLetterUpperCase(campoEndereco.replace(/\./g, " "))}</label>
              <span className={this.state.data[campo].required ? "required-style" : "none-style"}>*</span>
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

      if (camposImput[campo].type === "select") {
        inputs.push((
          <div className="form-group">
            <label className="rotulo">{FirstLetterUpperCase(campo.replace(/\./g, " "))}</label>
            <span className={this.state.data[campo].required ? "required-style" : "none-style"}>*</span>
            <select required={camposImput[campo].required} name={campo} value={this.state.data[campo].value === "" ? null : this.state.data[campo].value} onChange={(e) => this.onChange(e)} className="browser-default custom-select">
              <option>{camposImput[campo].descricao}</option>
              {camposImput[campo].options.map((option, key) => {
                return(<option key={key} value={option}>{FirstLetterUpperCase(option)}</option>)
              })}
            </select>
          </div>
        ))

        continue;
      } else {

        inputs.push((
          <div className="form-group">
            {/* 
            A função FirstLetterUpperCase() transforma todas as primeiras
            letras da palavra em maiúsculas e o restante permanece minúscula. 
          */}
            <label className="rotulo">{FirstLetterUpperCase(campo.replace(/\./g, " "))}</label>
            <span className={this.state.data[campo].required ? "required-style" : "none-style"}>*</span>
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