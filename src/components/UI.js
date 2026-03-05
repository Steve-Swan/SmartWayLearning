import React, { useState, useEffect, useRef } from 'react';
import { C } from '../utils/constants';

// ─── Animated Counter ───
export function AnimCounter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const go = (now) => {
          const p = Math.min((now - t0) / 1800, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 4)) * end));
          if (p < 1) requestAnimationFrame(go);
        };
        requestAnimationFrame(go);
      }
    }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Scroll Reveal ───
export function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transforms = {
    up: "translateY(50px)",
    scale: "scale(0.9)",
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : (transforms[direction] || transforms.up),
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Arrow Icon ───
export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Button ───
export function Btn({ children, onClick, href, variant = "primary", style: sx = {} }) {
  const styles = {
    primary: { background: C.green, color: C.white, boxShadow: `0 4px 16px ${C.green}33` },
    gold: { background: C.gold, color: C.navy },
    outline: { background: "transparent", color: C.gray900, border: `1.5px solid ${C.gray300}` },
    danger: { background: C.coral, color: C.white },
    ghost: { background: "transparent", color: C.green },
    dark: { background: C.navy, color: C.white },
    purple: { background: C.purple, color: C.white },
    coral: { background: C.coral, color: C.white },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    fontFamily: "'Outfit', sans-serif",
    transition: "all 0.3s",
    ...styles[variant],
    ...sx,
  };

  if (href) return <a href={href} style={base}>{children}</a>;
  return <button onClick={onClick} style={base}>{children}</button>;
}

// ─── Modal ───
export function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
      onClick={onClose}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(6px)" }} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", background: C.white, borderRadius: 24,
          width: "100%", maxWidth: width, maxHeight: "90vh", overflowY: "auto", overflowX: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,.2)",
        }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 28px 0", position: "sticky", top: 0, background: C.white,
          zIndex: 2, borderRadius: "24px 24px 0 0",
        }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 700, color: C.greenDeep }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: C.gray100, border: "none", width: 36, height: 36, borderRadius: 50,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: C.gray500,
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "20px 28px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Input ───
export function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: `1.5px solid ${C.gray300}`, fontSize: 15,
          fontFamily: "'Outfit', sans-serif", outline: "none",
          transition: "border .2s", boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = C.green)}
        onBlur={(e) => (e.target.style.borderColor = C.gray300)}
      />
    </div>
  );
}

// ─── Marquee ───
export function Marquee({ items }) {
  const d = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "16px 0" }}>
      <div style={{ display: "inline-flex", gap: 44, animation: "marquee 30s linear infinite" }}>
        {d.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
              color: C.gray500, textTransform: "uppercase", letterSpacing: "0.12em",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, opacity: 0.5 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
