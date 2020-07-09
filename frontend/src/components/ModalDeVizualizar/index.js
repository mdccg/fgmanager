import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './style_Visualizar.css';

import FirstLetterUpperCase from '../../funtions/firstLetterUpperCase';

class ModalDeVizualizar extends Component {

  createInputs() {
    const dados = this.props.data;
    var inputs = []
    for (var key in dados) {
      if (key.toLocaleLowerCase() !== "_id" && key.toLocaleLowerCase() !== "__v" && key.toLocaleLowerCase() !== "clickevent" && key.toLocaleLowerCase() !== "usuario") {
        if (typeof dados[key] !== "object") {
          inputs.push((
            <div className="form-group">
              <label htmlFor="nome">{FirstLetterUpperCase(key)}</label>
              <input
                type="text"
                disabled
                value={dados[key]}
                className="form-control"
              />
            </div>
          ))
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
          <MDBModalHeader toggle={() => this.props.toggle()} className="modal-header-visualisar-background"> <i class="far fa-eye"></i> Visualizar </MDBModalHeader>
          <MDBModalBody className="barra-de-rolagem">
            {this.renderInputs()}
          </MDBModalBody>
          <MDBModalFooter className="footer-modal-default-system">
            <MDBBtn color="" style={{ background: "#33B5E5", color: "white" }} size="sm" onClick={() => this.props.toggle()}>Fechar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </main>
    );
  }
}

export default ModalDeVizualizar;