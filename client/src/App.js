import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import LandingPage from './components/Landing';
import Home from './components/Home';
import PokeDetail from './components/PokeDetail';
import Form from './components/Form';
import Editor from './components/Editor';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = '/' element = { <LandingPage /> } />
          <Route path = '/home' element = { <Home /> } />
          <Route path = '/detail/:id' element = { <PokeDetail /> } />
          <Route path = '/pokecreator' element = { <Form /> } />
          <Route path = '/editor/:id' element = { <Editor />} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
