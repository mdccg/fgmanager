import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import BoxSolid from './../../assets/icons/BoxSolid';
import CogsSolid from './../../assets/icons/CogsSolid';
import UsersSolid from './../../assets/icons/UsersSolid';
import UsersCogSolid from './../../assets/icons/UsersCogSolid';
import InfoCircleSolid from './../../assets/icons/InfoCircleSolid';
import ShoppingCartSolid from './../../assets/icons/ShoppingCartSolid';
import CalendarAltRegular from './../../assets/icons/CalendarAltRegular';

const rotas = [
  { ico: CalendarAltRegular, label: 'Agenda', path: '/' },
  { ico: ShoppingCartSolid,  label: 'Vendas', path: '/vendas' },
  { ico: BoxSolid,           label: 'Estoque', path: '/estoque' },
  { ico: UsersSolid,         label: 'Clientes', path: '/clientes' },
  { ico: CogsSolid,          label: 'Ordem de serviço', path: '/ordem-de-servico' },
  { ico: UsersCogSolid,      label: 'Funcionários', path: '/funcionarios' },
  { ico: InfoCircleSolid,    label: 'Ajuda', path: '/ajuda' }
];

function Rota({ ico: Ico, label, path = '/' }) {
  const selecionada = window.location.pathname === path;

  return (
    <Link to={path}>
      <div className={'rota' + (selecionada ? ' selecionada' : '')}>
        <div className="icone">
          <Ico />
        </div>

        <span>{label}</span>
      </div>
    </Link>
  );
}

function MenuLateral({ location }) {
  useEffect(() => {}, [location]);

  return (
    <div className="menu-lateral unselectable">
      {rotas.map(rota => <Rota key={rota.path} {...rota} />)}
    </div>
  );
}

export default withRouter(props => <MenuLateral {...props} />);