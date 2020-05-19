import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
} from 'mdbreact';
import './styles.css';

class Teste extends Component {
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

  render() {
    return (
      <main>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="sm">
          <MDBModalHeader toggle={this.toggle}>Erro</MDBModalHeader>
          <MDBModalBody>
            {this.state.message}
          </MDBModalBody>
          {/* <MDBModalFooter>
            <MDBBtn color="danger" size="sm" onClick={this.toggle}>Close</MDBBtn>
          </MDBModalFooter> */}
        </MDBModal>

        <MDBBtn color="success" onClick={() => this.toggle('CPF inválido, seu mané!')}>Enviar dados inválidos</MDBBtn>
      </main>
    );
  }
}

export default Teste;