import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import { Toaster } from "./components/ui/toaster";

function App() {
  // Get the basename from the homepage URL for GitHub Pages deployment
  const basename = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
