import moment from 'moment';

function retornaAgora(indiceMes = 0) {
  let agora = moment();

  if(indiceMes === 0)
    return agora;

  if(indiceMes > 0)
    return agora.add(indiceMes, 'month');

  if(indiceMes < 0)
    return agora.subtract(indiceMes * - 1, 'month');

  return '';
}

export default retornaAgora;