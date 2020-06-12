import $ from 'jquery'

const masksInputs = () => {

  var interval = setInterval(() => {

    $('.date').mask('00/00/0000', {
      placeholder: '',
    });

    $('#cpf').mask('000.000.000-00', {
      placeholder: 'ex: 000.000.000-00',
      clearIfNotMatch: true
    });

    $('#cnpj').mask('00.000.000/0000-00', {
      placeholder: ''
    });
    $('#telefone').mask('(00) 00000-0000', {
      placeholder: '(00) 00000-0000',
    });
    $('.celular').mask('(00) 0 0000-0000');

    $('#cep').mask('00.000-000');

    // if (
    //   document.getElementById("cpf") ||
    //   document.getElementById("telefone") ||
    //   document.getElementById("cep")
    // ) {
    //   clearInterval(interval);
    // }
  }, 100);
}

export default masksInputs
