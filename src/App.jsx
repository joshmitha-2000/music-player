import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Myplaylis from './Myplaylis';
import Fav from './Fav';
import Home from './Home'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-cyan-900 p-2.5 ">
        <ul className="flex space-x-4 flex-row justify-end">
          <li>
            <Link to="/" className="text-white"></Link>
          </li>
          <li>
            <Link to="/about" className="text-white">Myplaylist</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white">Favourites</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white">Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<Myplaylis />} />
        <Route path="/contact" element={<Fav />} />
      </Routes>
    </BrowserRouter>
  );
}


