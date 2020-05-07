import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Agenda from './pages/Agenda';
import Estoque from './pages/Estoque';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Agenda} />
      <Route exact path="/estoque" component={Estoque} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/funcionarios" component={Funcionarios} />
    </Switch>
  </BrowserRouter>
);

export default routes;