import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faBox,
  faUsers,
  faUsersCog,
  faBars
} from '@fortawesome/free-solid-svg-icons';

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
      <FontAwesomeIcon
        icon={faBars}
        onClick={exibirMenu}
        style={{ visibility: visibility }} />
    );
  };
  
  const IconeAgenda = () => <FontAwesomeIcon icon={faCalendarAlt} />;
  const IconeEstoque = () => <FontAwesomeIcon icon={faBox} />;
  const IconeClientes = () => <FontAwesomeIcon icon={faUsers} />;
  const IconeFuncionarios = () => <FontAwesomeIcon icon={faUsersCog} />;

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