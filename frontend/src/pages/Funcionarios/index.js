import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Funcionarios() {
  const Funcionarios = () => (
    <div className="funcionarios">
      <h1 className="foo">Funcionários</h1>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <Funcionarios />
    </div>
  );
}

export default Funcionarios;