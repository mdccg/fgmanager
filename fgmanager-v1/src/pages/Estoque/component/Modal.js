import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdbreact';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import api from '../../../services/api';

import ModalErro from '../../../components/ModalErro';
import ModalSucesso from '../../../components/ModalSucesso';

import isEquivalent from '../../../funtions/compareObjects';

import masksInputs from '../../../funtions/masksInputs';

const initialState = {
  nome: "",
  marca: "",
  modelo: "",
  codigo: "",
  smartCard: ""
}

class ModalDeVizualizar extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.findModels = this.findModels.bind(this);
  }

  state = {
    ...initialState,
    listModelos: [],
    loadingOptions: true,
    mensagemSucesso: null,
    mensagemErro: null,
  }

  updateProduct(event) {
    event.preventDefault();

    const { nome, marca, modelo, codigo, smartCard } = this.state;
    let { dataOriginal, toggle, atualizarLista } = this.props;
    const dataUpdate = {
      ...dataOriginal,
      nome,
      marca,
      modelo,
      codigo,
      smartCard
    }

    api.post('/estoque/produto/editar', dataUpdate)
      .then(sucesso => {
        const { mensagem } = sucesso.data;
        console.log(mensagem)
        this.setState({
          mensagemSucesso: mensagem,
        });
        atualizarLista();
        toggle();
      })
      .catch(error => {
        if (error) {
          const { mensagem } = error.response.data;
          this.setState({ mensagemErro: mensagem });
        }
      });
  }

  toggleMensagemErro() {
    this.setState({ mensagemErro: null })
  }

  toggleMensagemSucesso() {
    this.setState({ mensagemSucesso: null })
  }

  SaveProduct(e) {
    e.preventDefault()

    const { nome, marca, modelo, codigo, smartCard } = this.state;

    api.post('estoque/produto/novo', { nome, marca, modelo, codigo, smartCard })
      .then((sucesso) => {
        const { mensagem } = sucesso.data;
        this.setState({ mensagemSucesso: mensagem });
        this.props.atualizarLista();
        this.props.toggle();
      })
      .catch(error => {
        const { data } = error.response;
        if (data) {
          const mensagem = data.mensagem ? data.mensagem : error.message
          this.setState({ mensagemErro: mensagem });
        }
      });
  }

  componentWillReceiveProps(props) {
    const { data, action } = props;
    if (data && action === "editar") {
      this.setState({ ...this.state, ...data })
    } else {
      this.setState({ ...this.state, ...initialState })
    }
  }

  createStates() {
    var camposImput = this.props.camposImput
    var setState = {}
    var endereco = {}
    for (var key in camposImput) {
      if (camposImput[key].name === "endereco") {
        for (var i in camposImput[key].camposDeEndereco) {
          endereco = { ...endereco, [camposImput[key].camposDeEndereco[i].name]: { value: "", type: camposImput[key].camposDeEndereco[i].type, required: camposImput[key].camposDeEndereco[i].required } }
        }
        continue;
      }
      setState = {
        ...setState,
        [camposImput[key].name]: {
          value: "",
          type: camposImput[key].type,
          required: camposImput[key].required,
          descricao: camposImput[key].descricao,
          options: camposImput[key].options,
          loading: camposImput[key].loading,
          addToList: camposImput[key].addToList,
          request: camposImput[key].request
        }
      };
    }

    setState.endereco = endereco;

    this.setState({ data: setState });
  }

  onChange(e) {
    var name = e.target.name
    var value = e.target.value

    this.setState({ [name]: value });
  }


  componentDidMount() {
    this.findModels();
  }


  componentDidUpdate() {
    masksInputs()
  }

  findModels() {
    api.get("estoque/modelo")
      .then(response => {
        let modelos = [];
        response.data.filter(modelo => modelos.push(modelo.nome));
        this.setState({ listModelos: modelos, loadingOptions: false });
      })
  }

  saveModel() {
    const { modelo } = this.state;
    api.post('estoque/modelo/novo', { 'nome': modelo })
      .then(response => {
        const mensagem = response.data.mensagem;
        this.setState({ mensagemSucesso: mensagem });
        this.findModels();
      })
      .catch(e => {
        console.log(e)
        this.setState({ mensagemErro: "Erro ao cadastrar novo modelo" })
      })
  }

  render() {

    const { action, toggle, dataOriginal } = this.props;

    const {
      nome,
      marca,
      loadingOptions,
      modelo,
      listModelos,
      codigo,
      smartCard,

    } = this.state;

    const dataUpdate = {
      ...dataOriginal,
      nome,
      marca,
      modelo,
      codigo,
      smartCard,
    }

    return (
      <main>
        <MDBModal isOpen={this.props.isOpen} toggle={() => this.props.toggle()}>
          {action === "novo" ?
            <MDBModalHeader toggle={() => toggle()} className="modal-header-cadastrar-background"> <i class="fas fa-plus-circle"></i> Casdastrar </MDBModalHeader>
            : <MDBModalHeader toggle={() => toggle()} className="modal-header-Edicao-background"> <i class="fas fa-edit"></i> Editar </MDBModalHeader>
          }
          <form onSubmit={(e) => action === "novo" ? this.SaveProduct(e) : this.updateProduct(e)}>
            <MDBModalBody className="barra-de-rolagem">
              <div className="form-group">
                <label className="rotulo">Nome</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="form-control"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={nome}
                  onChange={this.onChange}
                  required={true}
                  mask-clearifnotmatch="true"
                />
              </div>
              <div className="form-group">
                <label className="rotulo">Marca</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="marca"
                  id="marca"
                  className="form-control"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={marca}
                  onChange={this.onChange}
                  required={true}
                  mask-clearifnotmatch="true"
                />
              </div>
              <div className="autocomplete-format">
                <label className="rotulo">Modelo</label>
                <span className={"required-style"}>*</span>
                <Autocomplete
                  options={listModelos}
                  getOptionLabel={(option) => option}
                  id="disable-close-on-select"
                  name="modelo"
                  value={modelo}
                  clearOnBlur={false}
                  loading={loadingOptions}
                  className="mb-3"
                  onChange={(event, value) => this.onChange({
                    target: {
                      name: "modelo",
                      value: value
                    }
                  })
                  }
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        style={{ width: "78%" }}
                        name="modelo"
                        placeholder="Selecione um modelo..."
                        variant='outlined'
                        onChange={this.onChange}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingOptions ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                      <Button
                        style={{ width: "20%" }}
                        disableElevation
                        className="ml-2"
                        variant="contained"
                        disabled={listModelos.filter(opt => opt === modelo)[0] || !modelo}
                        onClick={this.saveModel.bind(this)}
                      >
                        Salvar
                      </Button>
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="rotulo">Código</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="codigo"
                  id="codigo"
                  className="form-control"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={codigo}
                  onChange={this.onChange}
                  required={true}
                  mask-clearifnotmatch="true"
                />
              </div>
              <div className="form-group">
                <label className="rotulo">SmartCard</label>
                <span className="required-style">*</span>
                <input
                  type="text"
                  name="smartCard"
                  id="smartCard"
                  className="form-control"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={smartCard}
                  onChange={this.onChange}
                  required={true}
                  mask-clearifnotmatch="true"
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter className="footer-modal-default-system">
              {action === "novo" ?
                <MDBBtn color="" style={{ background: "#61CA52", color: "white" }} size="sm" type="submit">Salvar</MDBBtn>
                : <MDBBtn color="" style={{ background: "#FEBB33", color: "white" }} disabled={isEquivalent(dataUpdate, dataOriginal)} size="sm" type="submit">Salvar</MDBBtn>
              }
            </MDBModalFooter>
          </form>
        </MDBModal>

        <ModalSucesso mensagem={this.state.mensagemSucesso} toggle={() => this.toggleMensagemSucesso()} rotaDeRetorno="estoque" />
        <ModalErro mensagem={this.state.mensagemErro} toggle={() => this.toggleMensagemErro()} />
        {masksInputs()}
      </main>
    );
  }
}

export default ModalDeVizualizar;