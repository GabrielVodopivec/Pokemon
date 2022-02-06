import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing';
import Home from './components/Home';
import PokeDetail from './components/PokeDetail';
import Form from './components/Form';
/* import NavBar from './components/NavBar'; */

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route exact path = '/' element = { <LandingPage /> } />
          <Route path = '/home' element = { <Home /> } />
          <Route path = '/detail/:id' element = { <PokeDetail /> } />
          <Route path = '/pokecreator' element = { <Form /> } />
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
