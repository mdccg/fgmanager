import React from 'react';
import './styles.css';

import { MDBDataTable } from 'mdbreact';

import Header from './../../components/Header';

function Estoque() {
  const DatatablePage = () => {
    const data = {
      columns: [
        {
          label: 'Código',
          field: 'codigo',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nome',
          field: 'nome',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Marca',
          field: 'marca',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Modelo',
          field: 'modelo',
          sort: 'asc',
          width: 100
        },
        {
          label: 'CRUD',
          field: 'crud',
          sort: 'asc',
          width: 100
        }
      ],
      rows: [
        {
          codigo: '7 896190 012342',
          nome: 'Telefone',
          marca: 'Motorola',
          modelo: 'Smartphone',
          crud: <hr />,
        }
      ]
    };

    return (
      <MDBDataTable
        hover
        striped
        bordered
        responsive
        data={data}
        id="estoque" />
    );
  }

  /* const traduzir = () => {
    const $ = any => document.querySelector(any);

    setTimeout(() => {
      $('#estoque').DataTable({
        "language": {
          "lengthMenu": "Display _MENU_ records per page",
          "zeroRecords": "Nothing found - sorry",
          "info": "Showing page _PAGE_ of _PAGES_",
          "infoEmpty": "No records available",
          "infoFiltered": "(filtered from _MAX_ total records)"
        }
      });
    }, 1e3);
  } */

  const Estoque = () => (
    <div className="estoque">
      <h1>Estocão do seu Hadlei</h1>
      <DatatablePage />
    </div>
  );

  return (
    <div className="App">
      <Header />
      <Estoque />
    </div>
  );
}

export default Estoque;