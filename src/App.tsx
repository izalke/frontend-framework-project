// src/App.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home";
import Gallery from "./routes/gallery";
import Test123 from "./routes/test123";
import Login from "./Login";
import CarList from "./routes/CarList";

function App() {
  return (
    <div>
  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/test123" element={<Test123 />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
