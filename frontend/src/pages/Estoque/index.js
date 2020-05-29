import React, { Component, Fragment } from 'react';
import './styles.css';

import TabelaProdutos from './../../components/TabelaProdutos';
import api from './../../services/api';

import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

const isEmpty = object => Object.keys(object).length === 0 && object.constructor === Object;

class Estoque extends Component {
  state = {
    produtos: [],
    modelos: [],
    selecionado: {},
    modais: {
      cadastrar: false,
      editar: false,
      apagar: false, 
    },
  };

  toggle = operacao => {
    this.setState({
      modais: {
        [operacao]: !this.state.modais[operacao]
      }
    });
  }

  cadastrar = event => {
    event.preventDefault();
    const atributos = ['nome', 'marca', 'modelo', 'codigo', 'smartCard'],
          produto = {};
    
    for(const atributo of atributos)
      produto[atributo] = event.target[atributo].value;

    api.post('/estoque/produto/novo', produto)
      .then(response => console.log(response))
      .catch(error => console.error(error.response));

    alert('pressione f5 caro usuario!!!');
    this.toggle('cadastrar');
  }

  editar = () => {

  }

  apagar = () => {
    console.log(this.state.selecionado);
  }

  selecionarProduto = codigo => {
    const undoSelect = tbody => {
      for(const tr of tbody.querySelectorAll('tr')) {
        const className = tr.attributes.class;
        if(!className) continue;
        if(className.value === 'selecionada') {
          tr.classList.remove('selecionada');
          break;
        }
      }
    }

    const select = (tbody, codigo) => {
      for(const tr of tbody.querySelectorAll('tr')) {
        const td_codigo = tr.querySelector('td').textContent;
        if(td_codigo === codigo) tr.classList.add('selecionada');
      }
    }

    const { selecionado: antigo } = this.state;
    const selecionado = this.state.produtos.filter(produto => produto.codigo === codigo)[0];
    
    const tbody = document.querySelector(`.estoque tbody[data-test='table-body']`);

    if(!isEmpty(antigo)) {
      undoSelect(tbody);

      if(antigo._id === selecionado._id) {
        this.setState({ selecionado: {} });
        return;
      }
    }

    this.setState({ selecionado: selecionado });
    select(tbody, codigo);
  }

  getModeloById = _id => {
    try {
      return this.state.modelos.filter(modelo => modelo._id === _id)[0];
    
    } catch(exception) {
      console.error(
        'TesteDeAlonsoError: NÃO ALTERNE ENTRE AS TELAS TÃO RÁPIDO!\n'
        + '\tat Estoque.getModeloById (index.js:16)\n'
        + '\tat CasaDoCaixaPrego.js (<anonymous>)\n'
        + '\tat QuintoDosInferno.ts (<anonymous>)\n' // bazinga
        + '\tat LaOndeJudasPerdeuAsBotas.cs (baphoMet.java:666)'
      );
    }
  }

  async componentDidMount() {
    let produtos = (await api.get('/estoque/produto')).data;
    let modelos = (await api.get('/estoque/modelo')).data;
    
    this.setState({ modelos: modelos });
    
    produtos.map(produto => {
      produto.clickEvent = event => {
        const tr = event.currentTarget;
        const codigo = tr.querySelector('td').textContent;
        
        this.selecionarProduto(codigo);
      };

      const modelo = {};
      modelo._id = produto.modelo;
try { modelo.nome = this.getModeloById(modelo._id).nome; } catch(exception) {}

      return produto.modelo = modelo.nome;
    });
    
    this.setState({ produtos: produtos });
  }

  render() {
    const { produtos, selecionado } = this.state;

    const ModalCadastro = ({ isOpen, toggle }) => (
      <MDBModal isOpen={isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Cadastrar produto</MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={event => this.cadastrar(event)} method="POST">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" name="nome" placeholder="Moto G(6)" required />
            </div>

            <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input type="text" className="form-control" name="marca" placeholder="Smartphone" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" className="form-control" name="modelo" placeholder="Motorola" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="codigo">Código</label>
              <input type="text" className="form-control" name="codigo" placeholder="0 1234 5678 9" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="smartCard">Smart card</label>
              <input type="text" className="form-control" name="smartCard" placeholder="40-02-89-22" required />
            </div>

            <MDBBtn color="success" type="submit">Cadastrar</MDBBtn>
          </form>
        </MDBModalBody>
      </MDBModal>
    );

    const ModalEdicao = ({ isOpen, toggle, selecionado }) => {
      return (
        <MDBModal isOpen={isOpen} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Editar produto</MDBModalHeader>
          <MDBModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" className="form-control" name="nome" placeholder="Moto G(6)" value={selecionado.nome} />
              </div>

              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input type="text" className="form-control" name="marca" placeholder="Smartphone" value={selecionado.marca} />
              </div>
              
              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input type="text" className="form-control" name="modelo" placeholder="Motorola" value={selecionado.modelo} />
              </div>
              
              <div className="form-group">
                <label htmlFor="codigo">Código</label>
                <input type="text" className="form-control" name="codigo" placeholder="0 1234 5678 9" value={selecionado.codigo} />
              </div>
              
              <div className="form-group">
                <label htmlFor="smartCard">Smart card</label>
                <input type="text" className="form-control" name="smartCard" placeholder="40-02-89-22" value={selecionado.smartCard} />
              </div>

            </form>
          </MDBModalBody>
          <MDBModalFooter>
              <MDBBtn color="info">Salvar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      );
    }

    return (
      <main className="estoque">
        <div className="crud">
          <Fragment>
            <MDBBtn color="info" onClick={() => this.toggle('cadastrar')}>
              <MDBIcon icon="plus" className="mr-1" /> Cadastrar
            </MDBBtn>
            <ModalCadastro
              isOpen={this.state.modais.cadastrar}
              toggle={() => this.toggle('cadastrar')} />

            <MDBBtn color="info" onClick={() => this.toggle('editar')} disabled={isEmpty(selecionado)}>
              <MDBIcon icon="pencil-alt" className="mr-1" /> Editar
            </MDBBtn>
            <ModalEdicao
              isOpen={this.state.modais.editar}
              toggle={() => this.toggle('editar')}
              selecionado={selecionado} />

            <MDBBtn color="danger" onClick={this.apagar} disabled={isEmpty(selecionado)}>
              <MDBIcon icon="trash-alt" className="mr-1" /> Apagar
            </MDBBtn>
          </Fragment>
        </div>

        <TabelaProdutos produtos={produtos} />
      </main>
    );
  }
}

export default Estoque;