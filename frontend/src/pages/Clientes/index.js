import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Clientes() {
  const Clientes = () => (
    <div className="clientes">
      <div>
        <div>
          <div >
            <h2 >Clientes</h2>
          </div>
        </div>
        <input />

        <div >
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <Clientes />
    </div>
  );
}

export default Clientes;