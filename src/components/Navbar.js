import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { C } from '../utils/constants';
import { Btn } from './UI';
import Logo from './Logo';

export default function Navbar({ scrolled, onAuthOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "Test Prep", href: "#testprep" },
    { label: "SHSAT", href: "/shsat", isRoute: true },
    { label: "SAT", href: "/sat", isRoute: true },
    { label: "FOCUS", href: "#focus" },
    { label: "For Schools", href: "#forschools" },
    { label: "Point Store", href: "#shop" },
  ];

  const handleAnchorClick = (e, href) => {
    if (!isHome) {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  return (
    <nav style={{
      position: "fixed", top: scrolled ? 0 : 34, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(250,252,251,.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.greenPale}` : "none",
      transition: "all .4s", padding: scrolled ? "8px 0" : "14px 0",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}><Logo size={0.9} /></Link>

        {/* Desktop Nav */}
        <div className="desk-nav" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} className="nl" to={l.href} style={{ color: scrolled ? C.gray900 : C.gray700 }}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} className="nl" href={l.href} onClick={(e) => handleAnchorClick(e, l.href)} style={{ color: scrolled ? C.gray900 : C.gray700 }}>
                {l.label}
              </a>
            )
          )}
          <Btn onClick={onAuthOpen} variant="primary" style={{ padding: "9px 22px", fontSize: 13 }}>Start Today</Btn>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 22, height: 2, borderRadius: 2, background: C.greenDeep,
                transition: "all .3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translate(5px,-5px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mob-menu" style={{
          background: C.white, padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: 16, borderTop: `1px solid ${C.greenPale}`,
        }}>
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none", color: C.gray900, fontWeight: 600, fontSize: 16 }}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={(e) => { handleAnchorClick(e, l.href); setMenuOpen(false); }}
                style={{ textDecoration: "none", color: C.gray900, fontWeight: 600, fontSize: 16 }}>
                {l.label}
              </a>
            )
          )}
          <Btn onClick={() => { onAuthOpen(); setMenuOpen(false); }} variant="primary" style={{ justifyContent: "center" }}>Start Today</Btn>
        </div>
      )}
    </nav>
  );
}
