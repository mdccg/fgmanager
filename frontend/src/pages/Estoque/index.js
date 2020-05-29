import React, { Component } from 'react';
import './styles.css';

import api from './../../services/api';

class Estoque extends Component {
  state = {
    produtos: [],
    modelos: [],
  };

  getModeloById = _id => {
    const { modelos } = this.state;

    try {
      return modelos.filter(modelo => modelo._id === _id)[0].nome;
    
    } catch(exception) {
      console.error(
        'TesteDeAlonsoError: NÃO ALTERNE ENTRE AS TELAS TÃO RÁPIDO!\n'
        + '\tat Estoque.getModeloById (index.js:16)\n'
        + '\tat CasaDoCaixaPrego.js (<anonymous>)\n'
        + '\tat QuintoDosInferno.ts (<anonymous>)\n' // bazinga
        + '\tat LaOndeJudasPerdeuAsBotas.cs (baphoMet.java:666)'
      );
    }
  }

  async componentDidMount() {
    let produtos = (await api.get('/estoque/produto')).data;
    let modelos = (await api.get('/estoque/modelo')).data;
    
    console.log(produtos);

    this.setState({ modelos: modelos });
    
    produtos.map(produto => {
      const modelo_id = produto.modelo,
            modelo_nome = this.getModeloById(modelo_id);
      
      produto.modelo = modelo_nome;
    });
    
    this.setState({ produtos: produtos });
  }

  render() {
    return (
      <main className="estoque">
        {/* tabela e modais */}
      </main>
    );
  }
}

export default Estoque;