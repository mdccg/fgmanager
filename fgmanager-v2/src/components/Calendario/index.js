import { useState, useEffect } from 'react';
import './styles.css';

import ChevronLeftSolid from './../../assets/icons/ChevronLeftSolid';

import retornaAgora from './../../functions/retornaAgora';

import moment from 'moment';

const ciclo = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

function Dia({ dia, mes, ano }) {
  const [data, setData] = useState(null);

  function agendar() {
    let mes = data.format('MMMM');

    alert(`Agendando uma ordem de serviço para o dia ${dia} de ${mes} de ${ano}.`);
  }

  function getData() {
    var _dia = `${dia}`.split('');
    
    if(_dia.length === 1)
      _dia.unshift('0');
    
    _dia = _dia.join('');

    let data = `${_dia}/${mes}/${ano}`;

    setData(moment(data, 'DD/MM/YYYY'));
  }

  useEffect(() => {
    if(dia !== -1) 
      getData();

  }, [dia]);

  return (
    <div
      onClick={dia === -1 ? undefined : agendar}
      className={`dia${dia === -1 ? ' untouchable' : ''}`}>

      <span>{dia === -1 ? '' : dia}</span>
    </div>
  );
}

function Calendario() {
  const [indiceMes, setIndiceMes] = useState(0);

  const voltar  = () => setIndiceMes(indiceMes - 1);
  const avancar = () => setIndiceMes(indiceMes + 1);

  function retornaCalendario() {
    let ciclo = {
      inicial: retornaAgora(indiceMes).startOf('month').isoWeekday(),
      final:   retornaAgora(indiceMes).endOf('month').isoWeekday()
    };

    let lastDay = Number(retornaAgora(indiceMes).endOf('month').format('DD'));

    var calendario = [];
    var week = 0;

    if(ciclo.inicial !== 7)
      calendario[week] = Array(ciclo.inicial).fill(-1);

    for(let day = 1; day <= lastDay; ++day) {
      
      if(!calendario[week])
        calendario[week] = [];

      calendario[week].push(day);

      if(calendario[week].length >= 7) ++week;
    }

    if(!calendario[week])
      calendario[week] = [];
    
    calendario[week] = [...calendario[week], ...Array(7 - calendario[week].length).fill(-1)];

    while(calendario[week].length > 7)
      calendario[week].pop();

    ciclo = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    
    // console.table([ciclo, ...calendario]);

    return calendario;
  }

  return (
    <div className="calendario unselectable">
      <div className="calendario-header">
        <div className="calendario-btn" onClick={voltar}>
          <ChevronLeftSolid />
        </div>
        
        <div className="calendario-indicador-data">
          <span>{`${retornaAgora(indiceMes).format('MMMM [de] YYYY')}`}</span>
        </div>
        
        <div className="calendario-btn" onClick={avancar}>
          <ChevronLeftSolid />
        </div>
      </div>

      <div className="calendario-neck">
        {ciclo.map(dia => (
          <div key={dia}>
            <span>{dia}</span>
          </div>
        ))}
      </div>

      <div className="calendario-body">
        {retornaCalendario().map((semana, index) => (
          <div key={index} className="semana">
            {semana.map((dia, index) => (
              <Dia
                dia={dia}
                mes={retornaAgora(indiceMes).clone().format('MM')}
                ano={retornaAgora(indiceMes).clone().format('YYYY')}
                key={index} />
            ))}
          </div>
        )) || <></>}
      </div>
    </div>
  );
}

export default Calendario;