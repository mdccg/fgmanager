import React, { Component, Fragment } from 'react';
import './styles.css';

import { MDBBtn, MDBIcon, MDBDataTable } from 'mdbreact';

/**
 * 
 * @param {Object} objeto
 * @return {Boolean}
 * 
 * isVazio({}); // true
 * isVazio({ java: '<3' }); // false 
 */
const isVazio = objeto => Object.keys(objeto).length === 0 && objeto.constructor === Object;

class TabelaCrud extends Component {
  state = {
    selecionado: {},
  };

  selecionar = valor => {
    const tbody = document.querySelector('tbody');

    const { tuplas, identificador, selecionado, setSelecionado } = this.props;
    const { selecionado: antigo } = this.state;

    const deselecionarHtml = () => {
      for (const tr of tbody.querySelectorAll('tr')) {
        const className = tr.attributes.class;
        if (!className) continue;
        if (className.value === 'selecionada') {
          tr.classList.remove('selecionada');
          return;
        }
      }
    }

    const selecionarHtml = () => {
      for (const tr of tbody.querySelectorAll('tr')) {
        const candidato = tr.querySelector('td').textContent;
        if (candidato === valor) {
          tr.classList.add('selecionada');
          return;
        }
      }
    }

    const novo = tuplas.filter(tupla => tupla[identificador] === valor)[0];

    if (isVazio(selecionado)) {
      this.setState({ selecionado: novo });
      setSelecionado(novo);
      selecionarHtml();
      return;

    } else {
      deselecionarHtml();

      if (novo === antigo) {
        this.setState({ selecionado: {} });
        setSelecionado({});
        return;
      }

      this.setState({ selecionado: novo });
      setSelecionado(novo);
      selecionarHtml();
    }
  }

  render() {
    const { crud, data, selecionado } = this.props;

    if (data.rows) {
      data.rows.map(row => {
        row.clickEvent = event => {
          const tr = event.currentTarget;
          const identificador = tr.querySelector('td').textContent;

          this.selecionar(identificador);
        };

        return row;
      });
    }

    const dataLoading = {
      columns: [
        {
          label: 'LOADING...',
          field: 'loading',
          sort: 'asc',
          width: "100%",
        }
      ],
      rows: [{
        loading:
          (
            <div style={{ width: "100%", textAlign: "center" }}>
              <div class="spinner-border text-center" style={{ width: "3rem", height: "3rem" }} role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )
      }]
    };

    const dataOnTable = data.rows ? data : dataLoading

    return (
      <div>
        <div className="crud">
          <MDBBtn color="success" onClick={crud.create}>
            <MDBIcon icon="plus" />
          </MDBBtn>

          <MDBBtn color="info" onClick={crud.read} disabled={isVazio(selecionado)}>
            <MDBIcon icon="fas fa-eye" />
          </MDBBtn>

          <MDBBtn color="warning" onClick={crud.update} disabled={isVazio(selecionado)}>
            <MDBIcon style={{ color: "white" }} icon="fas fa-edit" />
          </MDBBtn>

          <MDBBtn color="danger" onClick={crud.delete} disabled={isVazio(selecionado)}>
            <MDBIcon icon="fas fa-trash-alt" />
          </MDBBtn>
        </div>

        <MDBDataTable
          data={dataOnTable}
          bordered
          striped
          hover />
      </div>
    );
  }
}

export default TabelaCrud;