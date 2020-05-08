import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Estoque() {
  const Estoque = () => (
    <div className="estoque">
      <h1 className="foo">Estoque</h1>
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