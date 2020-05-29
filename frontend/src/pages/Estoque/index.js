import React, { useState, Component, Fragment } from 'react';
import './styles.css';

import TabelaProdutos from './../../components/TabelaProdutos';
import api from './../../services/api';

import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact';

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

  cadastrarProduto = async event => {
    event.preventDefault();
    const atributos = ['nome', 'marca', 'modelo', 'codigo', 'smartCard'],
          produto = {};

    for(const atributo of atributos)
      produto[atributo] = event.target[atributo].value;
    
    const modelo = {};
    modelo.nome = produto.modelo;
    
    try {
      modelo._id = this.getModelo('nome', modelo.nome)._id;

    } catch(exception) {
      // TODO cadastrar modelo
      await this.cadastrarModelo(modelo.nome);
      modelo._id = this.getModelo('nome', modelo.nome)._id;
    }
    
    produto.modelo = modelo._id;

    api.post('/estoque/produto/novo', produto)
      .then(response => console.log(response))
      .catch(error => console.error(error.response));

    this.toggle('cadastrar');
    alert('pressione f5 caro usuario!!!');
  }

  cadastrarModelo = async nome => {
    await api.post('/estoque/modelo/novo', { nome: nome })
      .then(response => console.log(response))
      .catch(error => console.error(error.response));
  }

  editar = event => {
    event.preventDefault();
    const atributos = ['nome', 'marca', 'modelo', 'codigo', 'smartCard'],
          produto = {};

    for(const atributo of atributos)
      produto[atributo] = event.target[atributo].value;
    
    const modelo = {};
    modelo.nome = produto.modelo;
    modelo._id = this.getModelo('nome', modelo.nome)._id;
    
    produto.modelo = modelo._id;

    alert(JSON.stringify(produto));
    this.toggle('editar');
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

  getModelo = (atributo, valor) => {
    try {
      return this.state.modelos.filter(modelo => modelo[atributo] === valor)[0];
    
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
try { modelo.nome = this.getModelo('_id', modelo._id).nome; } catch(exception) {}

      return produto.modelo = modelo.nome;
    });
    
    this.setState({ produtos: produtos });
  }

  render() {
    const { modelos, produtos, selecionado, modais } = this.state;

    const ModalCadastro = ({ isOpen, toggle, modelos }) => (
      <MDBModal isOpen={isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Cadastrar produto</MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={event => this.cadastrarProduto(event)} method="POST">
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

              <input type="text" className="form-control" name="modelo" list="modelos" autoComplete="off" placeholder="Motorola" required />
              <datalist id="modelos">
                {modelos.map(modelo => <option key={modelo._id} value={modelo.nome}>{modelo._id}</option>)}
              </datalist>
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

    const ModalEdicao = ({ isOpen, toggle, selecionado, modelos }) => {
      const [nome, setNome] = useState(selecionado.nome);
      const [marca, setMarca] = useState(selecionado.marca);
      const [modelo, setModelo] = useState(selecionado.modelo);
      const [codigo, setCodigo] = useState(selecionado.codigo);
      const [smartCard, setSmartCard] = useState(selecionado.smartCard);

      return (
        <MDBModal isOpen={isOpen} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Editar produto</MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={event => this.editar(event)}>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={nome}
                  placeholder="Moto G(6)"
                  className="form-control"
                  onChange={event => setNome(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={marca}
                  placeholder="Smartphone"
                  className="form-control"
                  onChange={event => setMarca(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  list="modelos"
                  value={modelo}
                  autoComplete="off"
                  placeholder="Motorola"
                  className="form-control"
                  onChange={event => setModelo(event.target.value)} />
                <datalist id="modelos">
                  {modelos.map(modelo => <option key={modelo._id} value={modelo.nome}>{modelo._id}</option>)}
                </datalist>
              </div>

              <div className="form-group">
                <label htmlFor="codigo">Código</label>
                <input
                  type="text"
                  name="codigo"
                  value={codigo}
                  placeholder="0 1234 5678 9"
                  className="form-control"
                  onChange={event => setCodigo(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="smartCard">Smart card</label>
                <input
                  type="text"
                  name="smartCard"
                  value={smartCard}
                  placeholder="40-02-89-22"
                  className="form-control"
                  onChange={event => setSmartCard(event.target.value)} />
              </div>

              <MDBBtn color="warning" type="submit">Salvar</MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModal>
      );
    }

    return (
      <main className="estoque">
        <div className="crud">
          <Fragment>
            <MDBBtn color="success" onClick={() => this.toggle('cadastrar')}>
              <MDBIcon icon="plus" />
            </MDBBtn>

            <ModalCadastro
              modelos={modelos}
              isOpen={modais.cadastrar}
              toggle={() => this.toggle('cadastrar')} />

            <MDBBtn color="warning" onClick={() => this.toggle('editar')} disabled={isEmpty(selecionado)}>
              <MDBIcon icon="pencil-alt" />
            </MDBBtn>

            <ModalEdicao
              modelos={modelos}
              isOpen={modais.editar}
              selecionado={selecionado}
              toggle={() => this.toggle('editar')} />

            <MDBBtn color="danger" onClick={this.apagar} disabled={isEmpty(selecionado)}>
              <MDBIcon icon="trash-alt" />
            </MDBBtn>

            {/* ModalDelecao aqui */}
          </Fragment>
        </div>

        <TabelaProdutos produtos={produtos} />
      </main>
    );
  }
}

export default Estoque;