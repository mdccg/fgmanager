import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Menu extends Component {
  render() {
    const IconeMenu = () => {
      const { aberto, exibirMenu } = this.props;
      const visibility = aberto ? 'visible' : 'hidden';
  
      return (
        <div className="menu">
          <i
            onClick={exibirMenu}
            className="fas fa-bars"
            style={{ visibility: visibility }}></i>
        </div>
      );
    };

    const Ancora = props => {
      const className = props.rota === window.location.pathname ? 'rota-atual' : '';

      return (
        <Link to={props.rota} className={className}>
          <li>
            <i className={props.icone}></i>
            <span>{props.titulo}</span>
          </li>
        </Link>
      );
    }

    return (
      <aside>
        <IconeMenu />
        
        <ul>
          <Ancora rota="/" icone="far fa-calendar-alt" titulo="Agenda" />
          <Ancora rota="/estoque" icone="fas fa-box" titulo="Estoque" />
          <Ancora rota="/clientes" icone="fas fa-users" titulo="Clientes" />
          <Ancora rota="/funcionarios" icone="fas fa-users-cog" titulo="Funcionários" />
          <Ancora rota="/vendas" icone="fas fa-shopping-cart" titulo="Vendas" />
        </ul>
      </aside>
    );
  }
}

export default Menu;