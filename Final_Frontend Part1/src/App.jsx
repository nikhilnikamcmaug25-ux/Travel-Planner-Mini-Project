import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthModal from "./components/AuthModal"; // 👈 import modal

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <BrowserRouter>
      <Navbar openAuthModal={openAuthModal} /> {/* 👈 pass function */}
      <Routes>
        <Route path="/" element={<Home openAuthModal={openAuthModal} />} /> {/* 👈 pass to Hero */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />

      {/* 👇 place modal globally */}
      <AuthModal show={showAuthModal} handleClose={closeAuthModal} />
    </BrowserRouter>
  );
}
