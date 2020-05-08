import React, { Component } from 'react';
import './styles.css';

class Clientes extends Component {
  render() {
    return (
      <div>
              <div className="title">
                <h1>Clientes</h1>
              </div>
              <div style={{backgroundColor:"green",flexDirection:"row",}}>
                <div>
                  <input/>
                </div>
                <div>
                  <button>+</button>
                </div>
              </div>
              <div>
      
              </div>
            </div>
    );
  }
}

export default Clientes;