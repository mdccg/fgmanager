import React from 'react';
import './styles.css';

import Header from './../../components/Header';

function Agenda() {
  const Agenda = () => (
    <div className="agenda">
      <h1 className="foo">Agenda</h1>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <Agenda />
    </div>
  );
}

export default Agenda;