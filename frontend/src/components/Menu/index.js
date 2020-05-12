import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Menu(props) {
  const rotaAtual = atual => {
    if(props.rota === atual) {
      return 'rota-atual';
    }
  }

  // componentes
  const IconeMenu = () => {
    const { aberto, exibirMenu } = props;
    const visibility = aberto ? 'visible' : 'hidden';

    return (
      <i
        className="fas fa-bars"
        onClick={exibirMenu}
        style={{ visibility: visibility }}></i>
    );
  };
  
  const IconeAgenda = () => <i className="far fa-calendar-alt"></i>;
  const IconeEstoque = () => <i className="fas fa-box"></i>;
  const IconeClientes = () => <i className="fas fa-users"></i>;
  const IconeFuncionarios = () => <i className="fas fa-users-cog"></i>;

  return (
    <aside>
      <div className="menu">
        <IconeMenu />
      </div>
      
      <ul>
        <Link to="/" className={rotaAtual('/')}>
          <li>
            <IconeAgenda />
            <span>Agenda</span>
          </li>
        </Link>
        <Link to="/estoque" className={rotaAtual('/estoque')}>
          <li>
            <IconeEstoque />
            <span>Estoque</span>
          </li>
        </Link>
        <Link to="/clientes" className={rotaAtual('/clientes')}>
          <li>
            <IconeClientes />
            <span>Clientes</span>
          </li>
        </Link>
        <Link to="/funcionarios" className={rotaAtual('/funcionarios')}>
          <li>
            <IconeFuncionarios />
            <span>Funcionários</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Menu;