import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import MoviePage from "./Movies";
import CustomerPage from "./Customers";
import ActorPage from "./Actors";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />  
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Movies" element={<MoviePage />} />
        <Route path="/Actors" element={<ActorPage />} />
        <Route path="/Customers" element={<CustomerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;