//import { Main } from './globalStyled.js'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return (
    <React.Fragment>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route  path="/home" element={<Home/>}/>
    </Routes>
    </React.Fragment>
  );
}

export default App;
