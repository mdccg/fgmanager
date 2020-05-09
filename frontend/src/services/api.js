const produtos = [
  {
    codigo: '7 896190 012342',
    nome: '',
    marca: '',
    modelo: '',
  }
];

const api = {
  get: route => {
    switch(route) {
      case '/produtos':
        return produtos;

      default:
        return [];
    }
  }
};

export default api;