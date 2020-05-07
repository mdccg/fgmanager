import React from 'react';
import Routes from './routes';
import './App.css';

import Header from './components/Header';
import Menu from './components/Menu';

const App = () => (
  <div className="App smooth-shadow">
    <Header />
    <Routes />
    <Menu className="stacatto" />
  </div>
);

export default App;