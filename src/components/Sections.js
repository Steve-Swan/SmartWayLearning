import React, { useState } from 'react';
import { C } from '../utils/constants';
import { Reveal } from './UI';

// ─── Top Contact Bar ───
export function TopBar({ scrolled }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: C.greenDeep, padding: "7px 24px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 28,
      fontSize: 12.5, transition: "transform .4s",
      transform: scrolled ? "translateY(-100%)" : "translateY(0)", flexWrap: "wrap",
    }}>
      <a href="tel:(347) 926-8575" style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.9)", textDecoration: "none", fontWeight: 600 }}>
        📞 (347) 926-8575
      </a>
      <span className="top-divider" style={{ width: 1, height: 12, background: "rgba(255,255,255,.2)" }} />
      <a href="https://www.instagram.com/smartwaylearningcenter" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.9)", textDecoration: "none", fontWeight: 600 }}>
        📸 @smartwaylearningcenter
      </a>
    </div>
  );
}

// ─── Grade Accordion ───
export function GradeAccordion({ grade, emoji, subjects, color, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={idx * 0.1}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: C.white, borderRadius: 20, overflow: "hidden", cursor: "pointer",
          border: `2px solid ${open ? color : "#e8ede9"}`,
          boxShadow: open ? `0 16px 48px ${color}15` : "none",
          transition: "all 0.4s",
        }}
      >
        <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, background: `${color}12`,
              transition: "transform 0.3s",
              transform: open ? "rotate(8deg) scale(1.1)" : "none",
            }}>
              {emoji}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: C.gray900 }}>{grade}</div>
              <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>{subjects.length} programs</div>
            </div>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={C.gray500} strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div style={{ maxHeight: open ? 250 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <div style={{ padding: "0 28px 24px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {subjects.map((s, i) => (
              <span key={i} style={{
                padding: "8px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600,
                background: `${color}10`, color,
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── FOCUS Schedule Tabs ───
export function FocusSchedule() {
  const [tab, setTab] = useState(0);
  const tabs = ["Weekday AM", "Weekday PM", "Weekend AM", "Weekend PM"];
  const data = [
    [{ g: "Group 1", d: "Mon & Wed", t: "9:00–10:30 AM" }, { g: "Group 2", d: "Tue & Thu", t: "9:00–10:30 AM" }],
    [{ g: "Group 3", d: "Mon & Wed", t: "5:00–6:30 PM" }, { g: "Group 4", d: "Tue & Thu", t: "5:00–6:30 PM", n: "10+" }],
    [{ g: "Group 5", d: "Sat & Sun", t: "10:00–11:30 AM" }, { g: "Group 6", d: "Sat & Sun", t: "12:00–1:30 PM", n: "10+" }],
    [{ g: "Group 7", d: "Sat & Sun", t: "3:00–4:30 PM" }, { g: "Group 8", d: "Sat & Sun", t: "5:00–6:30 PM", n: "10+" }],
  ];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              padding: "8px 16px", borderRadius: 50, border: "none", cursor: "pointer",
              fontSize: 12.5, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
              background: i === tab ? C.purple : `${C.purple}10`,
              color: i === tab ? C.white : C.purple,
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {data[tab].map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 18px", borderRadius: 14, background: `${C.purple}05`,
            border: `1px solid ${C.purple}10`, marginBottom: 8, flexWrap: "wrap", gap: 8,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900 }}>{s.g}</div>
            <div style={{ fontSize: 12, color: C.gray500 }}>{s.d}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {s.n && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 50,
                background: `${C.coral}12`, color: C.coral,
              }}>
                Ages {s.n}
              </span>
            )}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: C.purple }}>
              {s.t}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
