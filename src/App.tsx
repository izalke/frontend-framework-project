// src/App.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home";
import Gallery from "./routes/gallery";
import Test123 from "./routes/test123";

function App() {
  return (
    <div>
  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/test123" element={<Test123 />} />
      </Routes>
    </div>
  );
}

export default App;
