import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = '/' element = { <LandingPage /> } />
          <Route path = '/home' element = { <Home /> } />
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
