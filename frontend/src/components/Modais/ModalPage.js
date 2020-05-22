import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
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
        <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} size="sm">
          <MDBModalHeader toggle={ this.props.toggle}>Erro</MDBModalHeader>
          <MDBModalBody>
            {this.props.message}
          </MDBModalBody>
          {/* <MDBModalFooter>
            <MDBBtn color="danger" size="sm" onClick={this.toggle}>Close</MDBBtn>
          </MDBModalFooter> */}
        </MDBModal>
      </main>
    );
  }
}

export default ModalPage;