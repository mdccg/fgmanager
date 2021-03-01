import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './../components/Header';

import Ajuda from './../pages/Ajuda';
import Agenda from './../pages/Agenda';
import Vendas from './../pages/Vendas';
import Estoque from './../pages/Estoque';
import Clientes from './../pages/Clientes';
import Funcionarios from './../pages/Funcionarios';
import OrdemServico from './../pages/OrdemServico';

const routes = () => (
  <BrowserRouter>
    <Header />

    <Switch>
      <Route exact path="/" component={Agenda} />
      <Route exact path="/ajuda" component={Ajuda} />
      <Route exact path="/vendas" component={Vendas} />
      <Route exact path="/estoque" component={Estoque} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/funcionarios" component={Funcionarios} />
      <Route exact path="/ordem-de-servico" component={OrdemServico} />
    </Switch>
  </BrowserRouter>
);

export default routes;