import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './style_Edicao.css';

import isEquivalent from '../../funtions/compareObjects';
import FirstLetterUpperCase from '../../funtions/firstLetterUpperCase';


class ModalDeEdicao extends Component {

  // CamposDeEndereco = () => {
  //   if (this.props.data.endereco) {
  //     return (
  //       <div>
  //         <div className="form-group">
  //           <label className="rotulo">Rua</label>
  //           <input
  //             type="text"
  //             name="endereco.rua"
  //             id="inum_rua"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.rua}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="rotulo">Nº de Rua</label>
  //           <input
  //             type="text"
  //             name="endereco.numero"
  //             id="inum_rua"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.numero}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="rotulo">Bairro</label>
  //           <input
  //             type="text"
  //             name="endereco.bairro"
  //             id="ibairro"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.bairro}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="rotulo">Cidade</label>
  //           <input
  //             type="text"
  //             name="endereco.cidade"
  //             id="icidade"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.cidade}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>

  //         <div className="form-group ">
  //           <label className="rotulo">CEP</label>
  //           <input
  //             type="text"
  //             name="endereco.cep"
  //             id="icep"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.cep}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="rotulo">Ponto de referencia</label>
  //           <input
  //             type="text"
  //             name="endereco.pontoReferencia"
  //             id="iponto_referencia"
  //             className="form-control"
  //             aria-label="Large"
  //             aria-describedby="inputGroup-sizing-sm"
  //             value={this.props.data.endereco.pontoReferencia}
  //             onChange={(e) => this.props.onChange(e)}
  //           />
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     return <span></span>
  //   }
  // }

  createInputs() {
    const dados = this.props.data;
    var inputs = []
    for (var key in dados) {
      if (key.toLocaleLowerCase() !== "_id" && key.toLocaleLowerCase() !== "__v" && key.toLocaleLowerCase() !== "clickevent" && key.toLocaleLowerCase() !== "usuario") {
        if (typeof dados[key] === "array") {
          const inArray = dados[key]
          for (var i in inArray) {
            inputs.push((
              <div className="form-group">
                <label htmlFor="nome">{i === "pontoReferencia" ? "Ponto Referencia" : FirstLetterUpperCase(i)}</label>
                <input
                  type="text"
                  disabled
                  value={inArray[i]}
                  className="form-control"
                />
              </div>
            ))
          }
          continue
        }

        inputs.push((
          <div className="form-group">
            <label htmlFor="nome">{FirstLetterUpperCase(key)}</label>
            <input
              type="key"
              // disabled
              name={key}
              value={dados[key]}
              className="form-control"
              onChange={(e) => this.props.onChange(e)}
            />
          </div>
        ))
      }
    }

    return inputs
  }

  renderInputs() {
    var inputs = this.createInputs();

    return inputs.map((input, key) => {
      return <div key={key}>{input}</div>
    })
  }

  render() {
    return (
      <main>
        <MDBModal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}>
          <MDBModalHeader toggle={() => this.props.toggle()} className="modal-header-Edicao-background"> <i class="fas fa-edit"></i> Editar </MDBModalHeader>
          <form onSubmit={(e) => this.props.salvarDados(e)}>
            <MDBModalBody className="barra-de-rolagem">
              {/* <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="nome"
                  value={this.props.data.nome}
                  className="form-control"
                  onChange={(e) => this.props.onChange(e)}
                  required={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="marca">CPF</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="cpf"
                  value={this.props.data.cpf}
                  className="form-control"
                  onChange={(e) => this.props.onChange(e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modelo">RG</label>
                <input
                  type="text"
                  name="rg"
                  list="modelos"
                  value={this.props.data.rg}
                  autoComplete="off"
                  className="form-control"
                  onChange={(e) => this.props.onChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="codigo">Telefone</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="telefone"
                  value={this.props.data.telefone}
                  className="form-control"
                  onChange={(e) => this.props.onChange(e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="smartCard">E-mail</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="email"
                  value={this.props.data.email}
                  className="form-control"
                  onChange={(e) => this.props.onChange(e)}
                />
              </div> 
              <this.CamposDeEndereco /> */}
              {this.renderInputs()}
            </MDBModalBody>
            <MDBModalFooter className="footer-modal-default-system">
              {/* <MDBBtn color="danger" size="sm" onClick={() => this.props.toggle()}>Cancelar</MDBBtn> */}
              <MDBBtn color="" style={{ background: "#FEBB33", color: "white" }} disabled={isEquivalent(this.props.data, this.props.dataOriginal)} size="sm" type="submit">Salvar</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      </main>
    );
  }
}

export default ModalDeEdicao;