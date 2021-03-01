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
        <MDBModal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}>
        <MDBModalHeader className="size-padding-modal-erro modal-header-Excluir-background">  <i class="fas fa-trash-alt"></i> Excluir </MDBModalHeader>
          <MDBModalBody className="text-mensagem-visualisar">
            {this.props.mensagem}
          </MDBModalBody>
          <MDBModalFooter className="size-padding-modal-erro">
            <MDBBtn color="" style={{color: "white", background: "#F24847"}} size="sm" onClick={() => this.props.deletar()}>Sim</MDBBtn>
            <MDBBtn color="" style={{color: "white", background: "#F24847"}} size="sm" onClick={() => this.props.toggle()}>Cancelar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>




      </main>
    );
  }
}

export default ModalDeExcluir;