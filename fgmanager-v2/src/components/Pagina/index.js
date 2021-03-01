import './styles.css';

function Pagina(props) {
  return (
    <div className="plano-de-fundo">
      <div {...props} className={'pagina ' + props.className}>
        </div>
    </div>
  );
}

export default Pagina;