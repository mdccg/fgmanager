import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header';

import Agenda from './pages/Agenda';
import Estoque from './pages/Estoque';
import CadastroProdutos from './pages/CadastroProdutos';
import Clientes from './pages/Clientes';
import TabelaClientes from './pages/TabelaClientes';
import Funcionarios from './pages/Funcionarios';
import Vendas from './pages/Vendas';

import Teste from './pages/Teste';

const routes = () => (
  <BrowserRouter>
    <Header />

    <Switch>
      <Route exact path="/" component={Agenda} />
      <Route exact path="/estoque" component={Estoque} />
      <Route exact path="/estoque/novo" component={CadastroProdutos} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/tabelaClientes" component={TabelaClientes}/>
      <Route exact path="/funcionarios" component={Funcionarios} />
      <Route exact path="/vendas" component={Vendas} />
      
      <Route exact path="/teste" component={Teste} />
    </Switch>
  </BrowserRouter>
);

export default routes;