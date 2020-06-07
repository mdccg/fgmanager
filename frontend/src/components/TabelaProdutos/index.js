import React from 'react';
import { MDBDataTable } from 'mdbreact';

const TabelaProdutos = ({ produtos: rows }) => {

  var data = {}

  if (rows) {
    data = {
      columns: [
        {
          label: 'Código',
          field: 'codigo',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Smart card',
          field: 'smartCard',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nome',
          field: 'nome',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Modelo',
          field: 'modelo',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Marca',
          field: 'marca',
          sort: 'asc',
          width: 150
        }
      ],
      rows: rows
    };
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

  const dataOnTable = rows ? data : dataLoading

  return (
    <MDBDataTable
      hover
      striped
      bordered
      responsive
      responsiveSm
      responsiveMd
      responsiveLg
      responsiveXl
      data={dataOnTable}
    />
  );
}

export default TabelaProdutos; 