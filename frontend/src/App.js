import React from 'react';
import Routes from './routes';
import './App.css';

import Header from './components/Header';


const App = () => (
  <div className="App smooth-shadow">
    <Header />
    <Routes />
   
  </div>
);

export default App;