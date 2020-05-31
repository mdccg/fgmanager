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

  render() {
    return (
      <main>
        <MDBModal isOpen={this.props.mensagem} toggle={() => this.props.toggle()} size="lg">
          <MDBModalHeader className="size-padding-modal-visualisar modal-header-visualisar-background"> <a className="modal-header-background" onClick={() => this.props.toggle()}> <i class="far fa-eye">Visualizar</i> </a> </MDBModalHeader>
          <MDBModalBody className="text-mensagem-visualisar">
            <form>
              <div className="clientes">
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <label className="rotulo">Nome completo</label>
                        <input type="text" name="nome" id="inome" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Nº de CPF</label>
                        <input type="text" name="cpf" id="icpf" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Nº de RG</label>
                        <input type="text" name="rg" id="irg" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label className="rotulo">Telefone</label>
                        <input type="text" name="tel" id="itel" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">E-Mail</label>
                        <input type="text" name="email" id="iemail" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Rua</label>
                        <input type="text" name="rua" id="irua" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label className="rotulo">Nº de Rua</label>
                        <input type="text" name="num_rua" id="inum_rua" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Bairro</label>
                        <input type="text" name="bairro" id="ibairro" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Cidade</label>
                        <input type="text" name="cidade" id="icidade" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>

                    </div>
                    <div className="row ">
                      <div className="col-lg-4 ">
                        <label className="rotulo">CEP</label>
                        <input type="text" name="cep" id="icep" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                      <div className="col-lg-4">
                        <label className="rotulo">Ponto de referencia</label>
                        <input type="text" name="ponto_referencia" id="iponto_referencia" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter className="size-padding-modal-erro">
            <MDBBtn color="danger" size="sm" onClick={() => this.props.toggle()}>Fechar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>




      </main>
    );
  }
}

export default ModalDeVizualizar;