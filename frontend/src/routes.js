import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header';

import Agenda from './pages/Agenda';
import Estoque from './pages/Estoque';
import Clientes from './pages/Clientes';
import TabelaClientes from './pages/TabelaClientes';
import Funcionarios from './pages/Funcionarios';
import Vendas from './pages/Vendas';

import Teste from './pages/Teste';

import LoadingOverlay from 'react-loading-overlay';

const routes = () => (

  <BrowserRouter>

    <LoadingOverlay
      active={true}
      spinner
      text='Carregando...'
      fadeSpeed={10}
    >
    </LoadingOverlay>
    <Header />

    <Switch>
      <Route exact path="/" component={Agenda} />
      <Route exact path="/estoque" component={Estoque} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/tabelaClientes" component={TabelaClientes} />
      <Route exact path="/funcionarios" component={Funcionarios} />
      <Route exact path="/vendas" component={Vendas} />

      <Route exact path="/teste" component={Teste} />
    </Switch>

  </BrowserRouter>

);

export default routes;