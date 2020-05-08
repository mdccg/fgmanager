import React, { Component } from 'react';
import './styles.css';

class Agenda extends Component {
  render() {
    return (
      <div>
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
  }
}

export default Agenda;