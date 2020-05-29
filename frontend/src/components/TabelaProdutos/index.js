import React from 'react';
import { MDBDataTable } from 'mdbreact';

const TabelaProdutos = ({ produtos: rows }) => {
  const data = {
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
      data={data}
    />
  );
}

export default TabelaProdutos; 