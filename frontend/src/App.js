import React from 'react';
import Routes from './routes';
import './App.css';

import Loading from "./loading.js";

import LoadingScreen from 'react-loading-screen';

import LoadingOverlay from 'react-loading-overlay';

const App = () => (
  <div className="App">
    {/* <LoadingOverlay
      active={true}
      spinner
      text='Loading your content...'
      fadeSpeed={10}
    > */}
      <Routes />
    {/* </LoadingOverlay> */}
    {/* <LoadingScreen
      loading={true}
      bgColor='rgba(0, 0, 0, 0.1)'
      spinnerColor='#bd2b20'
      textColor='#676767'
      // logoSrc='/logo.png'
      // text='Here an introduction sentence (Optional)'
    >
      <Routes />
    </LoadingScreen> */}
    {/* <header className="App-header">
      <Loading />
    </header> */}
    {/* <Routes /> */}
  </div>
);

export default App;