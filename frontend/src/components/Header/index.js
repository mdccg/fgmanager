import React from 'react';
import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import perfil from './../../tmp/foto-de-perfil.png';

function Header() {
  // funções
  const exibirMenu = () => alert('Abrindo menu...');
  const exibirOpcoes = () => alert('Abrindo opções...');

  // componentes
  const IconeMenu = props => (
    <FontAwesomeIcon
      icon={faBars}
      onClick={props.onClick} />
  );

  const Usuario = () => {
    const Assets = props => (
      <FontAwesomeIcon
        icon={faCaretDown}
        onClick={props.onClick} />
    );
    
    return (
      <div className="usuario">
        <img src={perfil} alt="Perfil" className="perfil" />
        <Assets onClick={exibirOpcoes} />
      </div>
    );
  }

  return (
    <header className="no-select">
      <IconeMenu onClick={exibirMenu} />
      <Usuario />
    </header>
  );;
}

export default Header;