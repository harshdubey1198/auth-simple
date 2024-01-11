import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';  // Replace with the correct path

import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
