//import { Main } from './globalStyled.js'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDogs from './components/CreateDogs';
import Details from './components/Details';



function App() {
  
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<CreateDogs />} />
        <Route path="/dogs/:id" element={<Details />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
