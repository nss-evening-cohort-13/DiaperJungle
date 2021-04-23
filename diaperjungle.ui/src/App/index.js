import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/routes';
import Navbar from '../components/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
