import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './style_Visualizar.css';


class ModalDeVizualizar extends Component {

  state = {
    cpf: '',
    email: '',
    nome: '',
    rg: '',
    telefone: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      cep: '',
      pontoReferencia: ''
    }
  }

  carregarValoresNosInputs() {
    for (var atributo in this.props.data) {
      if (atributo === "endereco") {
        for (var AtributoEndereco in this.props.data[atributo]) {
          this.setState({ [AtributoEndereco]: this.props.data[atributo][AtributoEndereco] });
        }
        continue;
      }
      this.setState({ [atributo]: this.props.data[atributo] });
    }
  }

  componentWillReceiveProps() {
    this.carregarValoresNosInputs();
  }

  CamposDeEndereco = () => {
    if (this.props.data.endereco) {
      return (
        <div>
          <div className="form-group">
            <label className="rotulo">Rua</label>
            <input
              type="text"
              disabled
              name="num_rua"
              id="inum_rua"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.rua}
            />
          </div>
          <div className="form-group">
            <label className="rotulo">Nº de Rua</label>
            <input
              type="text"
              disabled
              name="num_rua"
              id="inum_rua"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.numero}
            />
          </div>
          <div className="form-group">
            <label className="rotulo">Bairro</label>
            <input
              type="text"
              disabled
              name="bairro"
              id="ibairro"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.bairro}
            />
          </div>
          <div className="form-group">
            <label className="rotulo">Cidade</label>
            <input
              type="text"
              disabled
              name="cidade"
              id="icidade"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.cidade}
            />
          </div>

          <div className="form-group ">
            <label className="rotulo">CEP</label>
            <input
              type="text"
              disabled
              name="cep"
              id="icep"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.cep}
            />
          </div>
          <div className="form-group">
            <label className="rotulo">Ponto de referencia</label>
            <input
              type="text"
              disabled
              name="ponto_referencia"
              id="iponto_referencia"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.endereco.pontoReferencia}
            />
          </div>
        </div>
      )
    } else {
      return <span></span>
    }
  }

  render() {

    return (
      <main>
        <MDBModal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}>
          <MDBModalHeader toggle={() => this.props.toggle()} className="modal-header-visualisar-background"> <i class="far fa-eye"></i> Visualizar </MDBModalHeader>
          <MDBModalBody className="barra-de-rolagem">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                disabled
                name="nome"
                value={this.state.nome}
                placeholder="Moto G(6)"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="marca">CPF</label>
              <input
                type="text"
                disabled
                name="marca"
                value={this.state.cpf}
                placeholder="Smartphone"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">RG</label>
              <input
                type="text"
                disabled
                name="modelo"
                list="modelos"
                value={this.state.rg}
                autoComplete="off"
                placeholder="Motorola"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigo">Telefone</label>
              <input
                type="text"
                disabled
                name="codigo"
                value={this.state.telefone}
                placeholder="0 1234 5678 9"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="smartCard">E-mail</label>
              <input
                type="text"
                disabled
                name="smartCard"
                value={this.state.email}
                placeholder="40-02-89-22"
                className="form-control"
              />
            </div>
            <this.CamposDeEndereco />
          </MDBModalBody>
          <MDBModalFooter className="footer-modal-default-system">
            <MDBBtn color="" style={{background: "#33B5E5", color: "white"}} size="sm" onClick={() => this.props.toggle()}>Fechar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </main>
    );
  }
}

export default ModalDeVizualizar;