import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import './styles/global.css';

// Components
import Navbar from './components/Navbar';
import { TopBar } from './components/Sections';
import AuthModal from './components/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import SHSATPage from './pages/SHSATPage';
import SATPage from './pages/SATPage';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse position for parallax
  useEffect(() => {
    const handleMouse = (e) => setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // ═══ MAIN SITE VIEW ═══
  return (
    <BrowserRouter>
      <div style={{ overflowX: "hidden" }}>
        {/* Modals */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

        {/* Top Bar & Navigation */}
        <TopBar scrolled={scrolled} />
        <Navbar
          scrolled={scrolled}
          onAuthOpen={() => setAuthOpen(true)}
        />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<HomePage mousePos={mousePos} onStartToday={() => setAuthOpen(true)} />} />
          <Route path="/shsat" element={<SHSATPage onStartToday={() => setAuthOpen(true)} />} />
          <Route path="/sat" element={<SATPage onStartToday={() => setAuthOpen(true)} />} />
        </Routes>
        <Analytics />
      </div>
    </BrowserRouter>
  );
}
