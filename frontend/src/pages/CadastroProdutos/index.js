import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Form = () => (
  <form>
    <div className="coluna">
      <label htmlFor="codigoAparelho">Código do aparelho</label>
      <input type="text" name="codigoAparelho" placeholder="0 51000 01251 7" />

      <label htmlFor="nome">Nome</label>
      <input type="text" name="nome" placeholder="Moto G(6)" />
      
      <label htmlFor="marca">Marca</label>
      <input type="text" name="marca" placeholder="Smartphone" />
    </div>

    <div className="coluna vazia"></div>

    <div className="coluna">
      <label htmlFor="codigoSmartCard">Código do smart card</label>
      <input type="text" name="codigoSmartCard" placeholder="No alto daquele cume..." />

      <label htmlFor="modelo">Modelo</label>
      <div className="modelo">
        <i class="fas fa-search"></i>

        <input type="text" name="modelo" placeholder="Buscar um modelo..." />
      </div>
      
      <input type="submit" value="Adicionar" />
    </div>
  </form>
);

class CadastroProdutos extends Component {
  render() {
    return (
      <main className="cadastro-produtos">
        <section className="cabecalho">
          <div></div>
          
          <h1>Cadastro de produto</h1>

          <Link to="/estoque">
            <button className="listar">Listar</button>
          </Link>
        </section>

        <Form />
      </main>
    );
  }
}

export default CadastroProdutos;