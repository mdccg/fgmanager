import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Estoque() {
  const Estoque = () => (
    <div className="estoque">
      <h1 className="foo">Estocão do seu Hadlei</h1>

      <table>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Modelo</th>
        </tr>
        <tr>
          <td>
            {/* produto aqui */}
          </td>
        </tr>
      </table>
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