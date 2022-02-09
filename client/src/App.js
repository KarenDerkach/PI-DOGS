import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDogs from './components/CreateDogs';
import Details from './components/Details';
import NavFilter from './components/NavFilter';
import FavoriteSite from './components/FavoriteSite';



function App() {
  
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dogs" element={<Header />} />
        <Route path="/dogs/:id" element={<Header />} />
        <Route path="favorites" element={<Header />} />
      </Routes>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home" element={<NavFilter/>}/>
        <Route path="/dogs" element={<CreateDogs />} />
        <Route path="/dogs/:id" element={<Details />} />
        <Route path="/favorites" element={<FavoriteSite/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
