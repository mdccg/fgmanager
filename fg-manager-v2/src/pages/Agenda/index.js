import './styles.css';

import Pagina from './../../components/Pagina';
import Calendario from './../../components/Calendario';

function Agenda() {
  return (
    <Pagina className="agenda">
      <Calendario />
    </Pagina>
  );
}

export default Agenda;