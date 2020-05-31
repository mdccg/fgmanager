import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './style_Excluir.css';


class ModalDeExcluir extends Component {

  render() {
    return (
      <main>
        <MDBModal isOpen={this.props.mensagem} toggle={() => this.props.toggle()} size="lg">
          <MDBModalHeader className="size-padding-modal-Excluir modal-header-Excluir-background"> <a className="modal-header-background" onClick={() => this.props.toggle()}> <i class="fas fa-trash-alt">Excluir</i> </a> </MDBModalHeader>
          <MDBModalBody className="text-mensagem-visualisar">
          TEM CERTEZA QUE DESEJA EXCLUIR ESTE CLIENTE?
          </MDBModalBody>
          <MDBModalFooter className="text-mensagem-Excluir">
            <MDBBtn color="success" size="sm" onClick={() => this.props.toggle()}>Sim</MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={() => this.props.toggle()}>Não</MDBBtn>
          </MDBModalFooter>
        </MDBModal>




      </main>
    );
  }
}

export default ModalDeExcluir;