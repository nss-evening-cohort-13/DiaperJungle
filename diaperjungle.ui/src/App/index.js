import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
