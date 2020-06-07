import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './index.css';


class Teste extends Component {

  render() {
    return (
      <main>
        <MDBModal isOpen={this.props.mensagem} position="center" toggle={() => this.props.toggle()} side position="bottom-right">
          <MDBModalHeader className="size-padding-modal-erro modal-header-erro-background"> <a className="title-header-modal-erro" onClick={() => this.props.toggle()}> <i class="far fa-times-circle"></i> </a> </MDBModalHeader>
          <MDBModalBody className="text-mensagem-modal-erro">
            {this.props.mensagem}
          </MDBModalBody>
          <MDBModalFooter className="size-padding-modal-erro">
            <MDBBtn color="danger" size="sm" onClick={() => this.props.toggle()}>fechar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


      </main>
    );
  }
}

export default Teste;