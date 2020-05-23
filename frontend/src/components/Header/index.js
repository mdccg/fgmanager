import React, { Component } from 'react';
import './styles.css';

import Menu from './../Menu';

class Header extends Component {
  state = { aberto: true };

  exibirMenu = () => {
    let $ = any => document.querySelector(any);

    const { aberto } = this.state,
                 App = $('.App'),
               aside = $('aside'),
              header = $('header'),
         aside_width = aberto ? '0' : '16em';
    
    aside.style.width = aside_width;
    App.style.marginLeft = aside_width;

    this.setState({ aberto: !aberto });
  }

  exibirOpcoes = () => alert(window.location.pathname);

  render() {
    const { aberto } = this.state;

    const Logo = () => {
      const visibility = aberto ? 'hidden' : 'visible'; // const display = aberto ? 'none' : 'block';
      
      return (
        <div className="logo">
          <div className="icone-menu" style={{ visibility: visibility }}>
            <i className="fas fa-bars" onClick={this.exibirMenu}></i>
          </div>

          <span>FG-Telecom&trade;</span>
        </div>
      );
    }

    const Usuario = props => {
      return (
        <div className="usuario" onClick={props.onClick}>
          <img
            src={require('./../../tmp/foto-de-perfil.png')}
            className="perfil"
            alt="Perfil" />
          
          <i className="fas fa-caret-down"></i>
        </div>
      );
    }

    return (
      <header className="no-select">
        <Logo />
        <Usuario onClick={this.exibirOpcoes} />

        <Menu aberto={aberto} exibirMenu={this.exibirMenu} />
      </header>
    );
  }
}

export default Header;