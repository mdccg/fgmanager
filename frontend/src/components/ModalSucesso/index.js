import React, { Component } from 'react';
import { Redirect } from 'react-router'
import {
    // MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    // MDBModalFooter
} from 'mdbreact';
import './index.css';

class Teste extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotaDeRetorno: null
        }
    }

    setTimeClose() {
        setTimeout(() => {
            this.props.toggle();
            if (this.props.rotaDeRetorno) {
                this.setState({ rotaDeRetorno: this.props.rotaDeRetorno });
            }
        }, 1500);
    }

    render() {

        if (this.props.mensagem) {
            this.setTimeClose();
        }

        if (this.state.rotaDeRetorno) {
            this.setState({ rotaDeRetorno: null })
            return <Redirect to={'/' + this.state.rotaDeRetorno} />;
        }

        return (
            <main>
                <MDBModal isOpen={this.props.mensagem} toggle={() => this.props.toggle()} size="sm" side position="bottom-right">
                    <MDBModalHeader className="size-padding-modal-sucesso modal-header-sucesso-background"> <a className="title-header-modal-sucesso" onClick={() => this.props.toggle()}> <i class="far fa-check-circle"></i> </a> </MDBModalHeader>
                    <MDBModalBody className="text-mensagem">
                        {this.props.mensagem}
                    </MDBModalBody>
                </MDBModal>

            </main>
        );
    }
}

export default Teste;