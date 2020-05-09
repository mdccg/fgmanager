import React, { useState } from 'react';
import './styles.css';

import Menu from './../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import perfil from './../../tmp/foto-de-perfil.png';

function Header() {
  const [aberto, setAberto] = useState(true);

  // funções
  const exibirMenu = () => {
    let $ = any => document.querySelector(any);

    const aside = $('aside'),
          width = aberto ? '0' : '16em',
     //  header = $('header'),
            App = $('.App');
    
    aside.style.width = width;
    App.style.marginLeft = width;

    setAberto(!aberto);
  }

  const exibirOpcoes = () => alert('Abrindo opções...');

  // componentes
  const Logo = () => {
    const visibility = aberto ? 'hidden' : 'visible';
    // const display = aberto ? 'none' : 'block';
    
    const IconeMenu = () => (
      <div className="icone-menu" style={{ visibility: visibility }}>
        <FontAwesomeIcon
          icon={faBars}
          onClick={exibirMenu} />
      </div>
    );
    
    return (
      <div className="logo">
        <IconeMenu />
        <span>FG-Telecom&trade;</span>
      </div>
    );
  }
    
  const Usuario = props => {
    const IconeAssets = () => <FontAwesomeIcon icon={faCaretDown} />;
    
    return (
      <div className="usuario" onClick={props.onClick}>
        <img src={perfil} alt="Perfil" className="perfil" />
        <IconeAssets />
      </div>
    );
  }

  return (
    <header className="no-select">
      <Logo />
      <Usuario onClick={exibirOpcoes} />

      <Menu
        aberto={aberto}
        exibirMenu={exibirMenu}
        rota={window.location.pathname} />
    </header>
  );
}

export default Header;