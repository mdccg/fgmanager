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
import Capitalize from '../../funtions/Capitalize';


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
    let { data: dados, requiredInputs, inputEspecial, inputEspecialList, onChange } = this.props;
    requiredInputs = requiredInputs ? requiredInputs : {}
    inputEspecial = inputEspecial ? inputEspecial : {}
    var inputs = []
    for (var key in dados) {
      if (key.toLocaleLowerCase() !== "_id" && key.toLocaleLowerCase() !== "__v" && key.toLocaleLowerCase() !== "clickevent" && key.toLocaleLowerCase() !== "usuario") {
        if (typeof dados[key] !== "object") {

          if (inputEspecial[key]) {
            inputs.push(inputEspecialList[key](requiredInputs[key], key, dados[key], onChange, Capitalize))
          }

          if (!inputEspecial[key]) {
            inputs.push((
              <div className="form-group">
                <label htmlFor="nome">{Capitalize(key)}</label>
                <span className={requiredInputs[key] ? "required-style" : "none-style"}>*</span>
                <input
                  type="text"
                  required={requiredInputs[key]}
                  name={key}
                  value={dados[key]}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                />
              </div>
            ))
          }
        }
      }
    }

    for (var key in dados) {
      if (key.toLocaleLowerCase() !== "_id" && key.toLocaleLowerCase() !== "__v" && key.toLocaleLowerCase() !== "clickevent" && key.toLocaleLowerCase() !== "usuario") {
        if (typeof dados[key] === "object") {
          const inArray = dados[key]
          for (var i in inArray) {
            inputs.push((
              <div className="form-group">
                <label htmlFor="nome">{i === "pontoReferencia" ? "Ponto Referencia" : Capitalize(i)}</label>
                <span className={requiredInputs[key] ? "required-style" : "none-style"}>*</span>
                <input
                  type="text"
                  value={inArray[i]}
                  required={requiredInputs[key]}
                  className="form-control"
                  name={"endereco." + i}
                  onChange={(e) => onChange(e)}
                />
              </div>
            ))
          }
          continue
        }
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
    const { isOpen, toggle, salvarDados } = this.props

    return (
      <main>
        <MDBModal isOpen={isOpen} toggle={() => toggle()}>
          <MDBModalHeader toggle={() => toggle()} className="modal-header-Edicao-background"> <i class="fas fa-edit"></i> Editar </MDBModalHeader>
          <form onSubmit={(e) => salvarDados(e)}>
            <MDBModalBody className="barra-de-rolagem">
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