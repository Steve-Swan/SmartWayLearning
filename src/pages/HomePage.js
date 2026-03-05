import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { C, PRODUCTS } from '../utils/constants';
import { AnimCounter, Reveal, Btn, Arrow, Marquee } from '../components/UI';
import Logo from '../components/Logo';
import { GradeAccordion, FocusSchedule } from '../components/Sections';

/* ── Gallery items — replace placeholder paths with your own images/videos in public/gallery/ ── */
const GALLERY_ITEMS = [
  { id: 1, type: "image", src: "/gallery/1.jpg", alt: "Tutoring session" },
  { id: 2, type: "image", src: "/gallery/2.jpg", alt: "Students working together" },
  { id: 3, type: "image", src: "/gallery/3.jpg", alt: "FOCUS program activity" },
  { id: 4, type: "image", src: "/gallery/4.jpg", alt: "Learning center classroom" },
  { id: 5, type: "image", src: "/gallery/5.jpg", alt: "Rewards ceremony" },
  { id: 6, type: "image", src: "/gallery/6.jpg", alt: "Group study session" },
  { id: 7, type: "video", src: "/gallery/tour.mp4", poster: "/gallery/tour-poster.jpg", alt: "Center tour" },
  { id: 8, type: "image", src: "/gallery/7.jpg", alt: "Student achievement" },
];

export default function HomePage({ mousePos, onStartToday }) {
  const [lightbox, setLightbox] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStart = useRef(null);

  const goTo = useCallback((idx) => {
    setCarouselIdx(Math.max(0, Math.min(GALLERY_ITEMS.length - 1, idx)));
  }, []);

  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(carouselIdx + (diff > 0 ? 1 : -1));
    }
    touchStart.current = null;
  }, [carouselIdx, goTo]);

  /* Renders a single gallery media item (shared between grid & carousel) */
  const renderGalleryItem = (item, height) => (
    <div
      onClick={() => setLightbox(item)}
      style={{
        position: "relative", borderRadius: 20, overflow: "hidden",
        background: C.gray100, border: `1px solid ${C.greenPale}`,
        cursor: "pointer", transition: "all 0.3s", height,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 40px ${C.green}12`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {item.type === "video" ? (
        <>
          <video
            src={item.src} poster={item.poster}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            muted playsInline
            onMouseEnter={(e) => e.target.play().catch(() => {})}
            onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.2)", pointerEvents: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={C.greenDeep}><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </>
      ) : (
        <img src={item.src} alt={item.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <div className="gallery-placeholder" style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
        background: `linear-gradient(135deg, ${C.greenPale}, ${C.gray100})`, zIndex: 0,
      }}>
        <span style={{ fontSize: 36 }}>{item.type === "video" ? "🎬" : "📷"}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.gray500 }}>{item.alt}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `radial-gradient(ellipse at 20% 50%, ${C.greenPale}, ${C.offWhite} 60%)`, position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 60 }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[{ w: 300, t: "5%", l: "-5%", bg: `${C.greenLight}10`, d: "8s" }, { w: 200, t: "60%", l: "80%", bg: `${C.gold}08`, d: "10s" }].map((s, i) => <div key={i} style={{ position: "absolute", width: s.w, height: s.w, top: s.t, left: s.l, background: s.bg, borderRadius: "30%", animation: `floatBlob ${s.d} ease-in-out infinite` }} />)}
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: `linear-gradient(${C.green} 1px, transparent 1px), linear-gradient(90deg, ${C.green} 1px, transparent 1px)`, backgroundSize: "60px 60px", transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`, transition: "transform 0.3s" }} />
        <div style={{ position: "absolute", top: "30%", right: "15%", width: 450, height: 450, borderRadius: "50%", background: `${C.green}12`, filter: "blur(100px)", animation: "heroGlow 6s ease-in-out infinite" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-main" style={{ display: "flex", alignItems: "center", gap: 56 }}>
            <div style={{ flex: 1.1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Reveal><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.white, border: `1.5px solid ${C.greenPale}`, padding: "7px 16px 7px 9px", borderRadius: 60, marginBottom: 24, boxShadow: `0 2px 10px ${C.green}06` }}>
                <span style={{ width: 26, height: 26, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${C.green}15`, fontSize: 12 }}>🎯</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: C.green }}>Now Enrolling 2025–2026</span>
              </div></Reveal>
              <Reveal delay={0.1}><h1 style={{ fontFamily: "'Lora', serif", fontSize: 58, fontWeight: 700, lineHeight: 1.08, color: C.greenDeep, marginBottom: 22 }}>
                Learn the<br /><span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Smart Way</span>
                  <svg style={{ position: "absolute", bottom: -5, left: 0, width: "100%" }} viewBox="0 0 200 12" fill="none"><path d="M2 8 C50 2, 150 2, 198 8" stroke={C.gold} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" style={{ animation: "dash 1.2s ease-out 0.8s forwards" }} /></svg>
                </span>
              </h1></Reveal>
              <Reveal delay={0.2}><p style={{ fontSize: 17, lineHeight: 1.75, color: C.gray500, maxWidth: 480, marginBottom: 32 }}>Professional tutoring & test prep for grades 1–12. In-person in Brooklyn with online sessions available — personalized plans that unlock real results.</p></Reveal>
              <Reveal delay={0.3}><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Btn onClick={onStartToday} variant="primary">Start Today <Arrow /></Btn>
                <Btn href="tel:(347) 926-8575" variant="outline">📞 (347) 926-8575</Btn>
              </div></Reveal>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Reveal delay={0.2} direction="scale">
                <div className="hero-visual" style={{ width: 400, height: 400, position: "relative", transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`, transition: "transform 0.4s" }}>
                  <div style={{ position: "absolute", inset: -20, borderRadius: "50%", border: `2px dashed ${C.green}18`, animation: "spin 40s linear infinite" }} />
                  <div style={{ position: "absolute", inset: 30, borderRadius: 28, background: C.white, boxShadow: `0 24px 60px ${C.green}10`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 32, border: `1px solid ${C.greenPale}` }}>
                    <div style={{ fontSize: 48, marginBottom: 4 }}>📚</div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, textAlign: "center" }}>SHSAT · SAT · NY State Tests</div>
                    <div style={{ fontSize: 13, color: C.gray500 }}>Math · ELA · Science · Regents</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {[{ l: "K–5", c: C.green }, { l: "6–8", c: C.gold }, { l: "9–12", c: C.coral }].map((g) => <span key={g.l} style={{ padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 700, background: `${g.c}12`, color: g.c }}>{g.l}</span>)}
                    </div>
                  </div>
                  {[{ t: "8px", r: "-8px", l: null, b: null, icon: "✅", text: "1-on-1 Available", c: C.greenDark, d: "5s" },
                    { t: null, r: null, l: "-14px", b: "8px", icon: "⭐", text: "5.0 Google Rating", c: C.goldDark, d: "6s" },
                    { t: "48%", r: null, l: "-22px", b: null, icon: "👥", text: "Groups ≤ 8", c: C.gray700, d: "7s" }
                  ].map((b, i) => <div key={i} style={{ position: "absolute", top: b.t, right: b.r, bottom: b.b, left: b.l, background: C.white, borderRadius: 16, padding: "10px 16px", boxShadow: "0 8px 28px rgba(0,0,0,.08)", display: "flex", alignItems: "center", gap: 7, animation: `floatBlob ${b.d} ease-in-out infinite ${i}s`, fontSize: 12, fontWeight: 700, color: b.c, border: `1px solid ${C.greenPale}` }}><span style={{ fontSize: 14 }}>{b.icon}</span>{b.text}</div>)}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div style={{ background: C.white, borderTop: `1px solid ${C.greenPale}`, borderBottom: `1px solid ${C.greenPale}` }}>
        <Marquee items={["SHSAT Prep", "SAT Prep", "FOCUS Program", "Algebra", "Geometry", "NY State Tests", "Regents", "Biology", "For Schools", "ELA"]} />
      </div>

      {/* ═══ STATS ═══ */}
      <section style={{ padding: "64px 48px", background: C.greenDeep, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `radial-gradient(circle, ${C.white} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative", zIndex: 1 }}>
          {[{ n: 98, s: "%", l: "Performance Improvement" }, { n: 86, s: "%", l: "Confidence Increase" }, { n: 73, s: "%", l: "Motivation Boost" }].map((st, i) => (
            <div key={i} style={{ textAlign: "center", padding: "28px 16px", background: "rgba(255,255,255,.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 48, fontWeight: 700, color: C.gold, lineHeight: 1 }}><AnimCounter end={st.n} suffix={st.s} /></div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: 14, fontWeight: 600, marginTop: 8 }}>{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROGRAMS ═══ */}
      <section id="programs" style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// PROGRAMS</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Every Grade. Every Subject.</h2>
          </div></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <GradeAccordion idx={0} grade="Elementary (Grades 1–5)" emoji="🎨" color={C.green} subjects={["Math Tutoring", "ELA / Reading", "Math Group (1–3)", "Computer / Talent Test"]} />
            <GradeAccordion idx={1} grade="Middle School (Grades 6–8)" emoji="🔬" color={C.gold} subjects={["SHSAT Prep", "Algebra 1 Regents", "Math", "ELA", "ELA Regents", "Science", "Geometry Regents"]} />
            <GradeAccordion idx={2} grade="High School (Grades 9–12)" emoji="🎓" color={C.coral} subjects={["Algebra 1", "Algebra 2", "Geometry", "ELA", "US History", "Biology", "SAT"]} />
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}><Btn onClick={onStartToday} variant="dark">Enroll in a Program <Arrow /></Btn></div>
        </div>
      </section>

      {/* ═══ TEST PREP ═══ */}
      <section id="testprep" style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.white}, ${C.greenMist})` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// TEST PREP</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Ace Your Exams</h2>
          </div></Reveal>
          <div className="prep-row" style={{ display: "flex", gap: 20 }}>
            {[{ title: "SHSAT Prep", price: "$390/mo", desc: "In-person Sun 10:30 AM–12:30 PM + free online Math Tuesdays.", tags: ["Group", "1-on-1", "Online"], accent: C.green, badge: "85% acceptance", link: "/shsat" },
              { title: "SAT Prep", price: "$390/mo", desc: "Sunday in-person 6–8 PM (Math + ELA) + free Wed online Math 8–9 PM.", tags: ["Sun In-Person", "Wed Free Online"], accent: C.gold, badge: "Free sessions", link: "/sat" },
              { title: "NY State Tests", price: "Contact Us", desc: "Targeted prep for ELA & Math state exams — building skills and confidence for test day.", tags: ["Grades 3–8", "In-Person", "Online"], accent: C.coral, badge: "All grade levels" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12} style={{ flex: 1 }}>
                <div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1.5px solid ${item.accent}12`, position: "relative", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, background: `${item.accent}05`, borderRadius: "0 24px 0 100%" }} />
                  <span style={{ alignSelf: "flex-start", padding: "5px 12px", borderRadius: 50, fontSize: 11.5, fontWeight: 700, background: `${item.accent}12`, color: item.accent, marginBottom: 16, position: "relative", zIndex: 1 }}>{item.badge}</span>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 700, color: C.greenDeep, marginBottom: 6 }}>{item.title}</h3>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: item.accent, marginBottom: 12 }}>{item.price}</div>
                  <p style={{ color: C.gray500, lineHeight: 1.7, fontSize: 14, marginBottom: 18, flex: 1 }}>{item.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>{item.tags.map((t, j) => <span key={j} style={{ padding: "6px 12px", borderRadius: 50, fontSize: 11.5, fontWeight: 600, background: C.gray100, color: C.gray700 }}>{t}</span>)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <Btn onClick={onStartToday} variant="primary" style={{ background: item.accent, padding: "10px 24px", fontSize: 13 }}>Start Today →</Btn>
                    {item.link && <Link to={item.link} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: item.accent, textDecoration: "none", padding: "10px 4px", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOCUS ═══ */}
      <section id="focus" style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// FOCUS PROGRAM</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Unlock Full Potential</h2>
          </div></Reveal>
          <div className="focus-layout" style={{ display: "flex", gap: 24 }}>
            <Reveal delay={0.1} style={{ flex: 1 }}><div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${C.purple}10`, height: "100%" }}>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, marginBottom: 18 }}>What's Inside</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {["Memory Games", "Visualization", "Mental Math", "Pomodoro", "Mind Mapping", "Puzzles", "Focus Training"].map((a) => <span key={a} style={{ padding: "8px 16px", borderRadius: 50, fontSize: 12.5, fontWeight: 600, background: `${C.purple}08`, color: C.purple }}>{a}</span>)}
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                {[{ d: "4 Weeks", p: "$375" }, { d: "8 Weeks", p: "$655" }].map((p) => <div key={p.d} style={{ flex: 1, padding: 16, borderRadius: 14, background: `${C.purple}05`, border: `1px solid ${C.purple}08`, textAlign: "center" }}><div style={{ fontSize: 12, color: C.gray500, fontWeight: 600 }}>{p.d}</div><div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: C.purple, marginTop: 4 }}>{p.price}</div></div>)}
              </div>
              <Btn onClick={onStartToday} variant="purple" style={{ padding: "10px 24px", fontSize: 13 }}>Register for FOCUS →</Btn>
            </div></Reveal>
            <Reveal delay={0.2} style={{ flex: 1 }}><div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${C.purple}10`, height: "100%" }}>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, marginBottom: 6 }}>Schedule</h3>
              <div style={{ fontSize: 12.5, color: C.gray500, marginBottom: 18 }}>Rolling admissions · 1.5 hrs · 2× per week</div>
              <FocusSchedule />
            </div></Reveal>
          </div>
        </div>
      </section>


      {/* ═══ FOR SCHOOLS ═══ */}
      <section id="forschools" style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.greenDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// FOR SCHOOLS</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Partner With Smart Way</h2>
          </div></Reveal>
          <div className="schools-layout" style={{ display: "flex", gap: 24 }}>
            <Reveal delay={0.1} style={{ flex: 1 }}><div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${C.greenPale}`, height: "100%" }}>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, marginBottom: 20 }}>Why Partner With Us?</h3>
              {[{ i: "👨‍🏫", t: "Expert Educators" }, { i: "📅", t: "Flexible Scheduling" }, { i: "📈", t: "Proven Results" }, { i: "🔄", t: "Holistic Approach" }].map((f) => (
                <div key={f.t} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.gray100}` }}>
                  <span style={{ fontSize: 20 }}>{f.i}</span><span style={{ fontWeight: 600, fontSize: 15 }}>{f.t}</span>
                </div>
              ))}
            </div></Reveal>
            <Reveal delay={0.2} style={{ flex: 1 }}><div style={{ background: `linear-gradient(150deg, ${C.greenDeep}, ${C.navy})`, borderRadius: 24, padding: "40px 36px", height: "100%" }}>
              <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>School Administrator?</div>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 700, color: C.white, lineHeight: 1.25, marginBottom: 20 }}>Bring Smart Way to Your School</h3>
              <a href="mailto:Smartwaylearningcenter@gmail.com" style={{ display: "block", color: "rgba(255,255,255,.8)", textDecoration: "none", fontSize: 14, marginBottom: 10 }}>✉️ Smartwaylearningcenter@gmail.com</a>
              <a href="tel:(347) 926-8575" style={{ display: "block", color: "rgba(255,255,255,.8)", textDecoration: "none", fontSize: 14, marginBottom: 10 }}>📞 (347) 926-8575</a>
              <a href="https://www.instagram.com/smartwaylearningcenter" style={{ display: "block", color: "rgba(255,255,255,.8)", textDecoration: "none", fontSize: 14, marginBottom: 24 }}>📸 @smartwaylearningcenter</a>
              <Btn href="mailto:Smartwaylearningcenter@gmail.com" variant="gold" style={{ padding: "10px 24px", fontSize: 13 }}>Contact Us</Btn>
            </div></Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SHOP ═══ */}
      <section id="shop" style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.white}, ${C.greenMist})` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// POINT STORE</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Earn Points, Get Prizes</h2>
            <p style={{ color: C.gray500, fontSize: 15, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>Students earn points for attendance, good grades & participation. Here's what you can redeem!</p>
          </div></Reveal>
          <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
            {PRODUCTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.03}>
                <div style={{ background: C.white, borderRadius: 18, padding: "24px 20px", border: `1px solid ${C.greenPale}`, transition: "all 0.3s", textAlign: "center", height: "100%" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${C.gold}10`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{item.emoji}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: `${C.gold}12`, color: C.goldDark }}>{item.cat}</span>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: C.gray900, marginTop: 8, lineHeight: 1.3, minHeight: 36 }}>{item.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 17, color: C.gold, margin: "8px 0 0" }}>{item.points} pts</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// WHY SMART WAY</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>The Personalized Difference</h2>
          </div></Reveal>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[{ i: "🎯", t: "Custom Plans", d: "Personalized roadmaps for each student." }, { i: "👨‍🏫", t: "Expert Instructors", d: "Educators who make it click." }, { i: "📊", t: "Proven Results", d: "Higher scores & specialized HS admission." }, { i: "👥", t: "Groups ≤ 8", d: "Real attention, faster progress." }, { i: "🏢", t: "In-Person + Online", d: "Brooklyn location & virtual sessions." }].map((item, i) => (
              <Reveal key={i} delay={i * 0.05}><div style={{ padding: "30px 24px", borderRadius: 20, background: C.white, border: `1px solid ${C.greenPale}`, transition: "all 0.3s", height: "100%" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${C.green}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.i}</div>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: C.greenDeep, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ color: C.gray500, fontSize: 13.5, lineHeight: 1.6 }}>{item.d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "88px 48px", background: `linear-gradient(160deg, ${C.greenDeep}, ${C.navy})`, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// TESTIMONIALS</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.white, marginTop: 10 }}>Families Love Smart Way</h2>
          </div></Reveal>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ n: "Anatoliy Shvarts", t: "My daughter scored 574 on the SHSAT and got into Brooklyn Tech! Many thanks to Roman!", r: "Parent" },
              { n: "Angela Gelman", t: "Very organized, safe, and fun. Roman is dedicated and professional. Highly recommend!", r: "Parent" },
              { n: "Jessie Brown", t: "Awesome place! Helped me learn so much. Super friendly. 10/10 recommend!", r: "Student" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1} style={{ flex: "1 1 280px", maxWidth: 340 }}>
                <div style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(10px)", borderRadius: 22, padding: "32px 28px", border: "1px solid rgba(255,255,255,.08)", height: "100%" }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{[...Array(5)].map((_, j) => <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={C.gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,.85)", fontStyle: "italic", marginBottom: 18 }}>"{t.t}"</p>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.white }}>{t.n}</div>
                  <div style={{ fontSize: 12, color: C.gold, fontWeight: 600, marginTop: 2 }}>{t.r}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// OUR CENTER</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Inside Smart Way</h2>
            <p style={{ color: C.gray500, fontSize: 15, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>Take a peek inside our tutoring center — where learning comes to life every day.</p>
          </div></Reveal>

          {/* Desktop Grid */}
          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {GALLERY_ITEMS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05} style={i === 6 ? { gridColumn: "span 2", gridRow: "span 2" } : {}}>
                {renderGalleryItem(item, i === 6 ? "100%" : 220)}
              </Reveal>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="gallery-carousel" style={{ display: "none" }}>
            <div
              style={{
                background: C.white, borderRadius: 24, padding: 16,
                border: `1px solid ${C.greenPale}`, boxShadow: `0 8px 32px ${C.green}08`,
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Slide window */}
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 16 }}>
                <div style={{
                  display: "flex", transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
                  transform: `translateX(-${carouselIdx * 100}%)`,
                }}>
                  {GALLERY_ITEMS.map((item) => (
                    <div key={item.id} style={{ minWidth: "100%", flexShrink: 0 }}>
                      {renderGalleryItem(item, 280)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <div style={{ textAlign: "center", marginTop: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.gray700 }}>{GALLERY_ITEMS[carouselIdx].alt}</span>
                {GALLERY_ITEMS[carouselIdx].type === "video" && (
                  <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: `${C.coral}12`, color: C.coral }}>VIDEO</span>
                )}
              </div>

              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
                <button onClick={() => goTo(carouselIdx - 1)} disabled={carouselIdx === 0}
                  style={{
                    width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.greenPale}`,
                    background: carouselIdx === 0 ? C.gray100 : C.white, cursor: carouselIdx === 0 ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: carouselIdx === 0 ? 0.4 : 1, transition: "all .2s",
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.greenDeep} strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                <div style={{ display: "flex", gap: 6 }}>
                  {GALLERY_ITEMS.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)}
                      style={{
                        width: carouselIdx === i ? 20 : 8, height: 8, borderRadius: 50, border: "none",
                        background: carouselIdx === i ? C.green : C.gray300,
                        cursor: "pointer", transition: "all .3s", padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button onClick={() => goTo(carouselIdx + 1)} disabled={carouselIdx === GALLERY_ITEMS.length - 1}
                  style={{
                    width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.greenPale}`,
                    background: carouselIdx === GALLERY_ITEMS.length - 1 ? C.gray100 : C.white,
                    cursor: carouselIdx === GALLERY_ITEMS.length - 1 ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: carouselIdx === GALLERY_ITEMS.length - 1 ? 0.4 : 1, transition: "all .2s",
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.greenDeep} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>

              {/* Counter */}
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.gray500, fontWeight: 600 }}>{carouselIdx + 1} / {GALLERY_ITEMS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)", cursor: "zoom-out",
        }}>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: 20, right: 24, background: "none", border: "none",
            color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1,
          }}>&times;</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16, overflow: "hidden", cursor: "default" }}>
            {lightbox.type === "video" ? (
              <video src={lightbox.src} poster={lightbox.poster} controls autoPlay style={{ maxWidth: "90vw", maxHeight: "85vh", display: "block", borderRadius: 16 }} />
            ) : (
              <img src={lightbox.src} alt={lightbox.alt} style={{ maxWidth: "90vw", maxHeight: "85vh", display: "block", borderRadius: 16, objectFit: "contain" }} />
            )}
          </div>
        </div>
      )}

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Reveal direction="scale"><div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, borderRadius: 32, padding: "64px 44px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: `0 32px 80px ${C.green}20` }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `radial-gradient(circle, ${C.white} 1.5px, transparent 1.5px)`, backgroundSize: "20px 20px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 38, fontWeight: 700, color: C.white, marginBottom: 12 }}>You Can Always Start Today</h2>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, marginBottom: 28, maxWidth: 440, margin: "0 auto 28px" }}>Every great achievement starts with a single decision.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn onClick={onStartToday} variant="gold">Start Today <Arrow /></Btn>
                <Btn href="tel:(347) 926-8575" variant="outline" style={{ color: C.white, borderColor: "rgba(255,255,255,.3)" }}>(347) 926-8575</Btn>
              </div>
            </div>
          </div></Reveal>
        </div>
      </section>

      {/* ═══ LOCATION / MAP ═══ */}
      <section id="location" style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.white}, ${C.greenMist})` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// VISIT US</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Located in the Heart of Brooklyn</h2>
            <p style={{ color: C.gray500, fontSize: 15, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>Stop by our Midwood location on Kings Highway — convenient for families across Brooklyn.</p>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {/* Map */}
              <div style={{ flex: "2 1 400px", minWidth: 0, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}`, boxShadow: `0 16px 48px ${C.green}08` }}>
                <iframe
                  title="Smart Way Learning Center Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.057!2d-73.9614!3d40.5965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244c68d8e2a97%3A0x5dd06fa0f8b1b4e4!2s803%20Kings%20Hwy%2C%20Brooklyn%2C%20NY%2011223!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="380"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Info card */}
              <div style={{ flex: "1 1 280px", minWidth: 0, background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${C.greenPale}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>📍</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, marginBottom: 6 }}>Smart Way Learning Center</h3>
                <p style={{ color: C.gray500, fontSize: 14.5, lineHeight: 1.7, marginBottom: 20 }}>803 Kings Highway<br />Brooklyn, NY 11223</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  <a href="tel:(347) 926-8575" style={{ display: "flex", alignItems: "center", gap: 8, color: C.gray700, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>📞 (347) 926-8575</a>
                  <a href="mailto:Smartwaylearningcenter@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: C.gray700, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>✉️ Smartwaylearningcenter@gmail.com</a>
                  <a href="https://www.instagram.com/smartwaylearningcenter" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: C.gray700, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>📸 @smartwaylearningcenter</a>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {["Midwood", "Flatbush", "Sheepshead Bay", "Gravesend", "Bensonhurst", "Marine Park"].map((n) => (
                    <span key={n} style={{ padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 600, background: `${C.green}10`, color: C.green }}>{n}</span>
                  ))}
                </div>
                <Btn href="https://www.google.com/maps/dir//803+Kings+Hwy,+Brooklyn,+NY+11223" variant="primary" style={{ alignSelf: "flex-start", padding: "10px 24px", fontSize: 13 }}>Get Directions →</Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: C.navy, padding: "60px 48px 36px", color: "#8a9ba3" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 44 }}>
            <div>
              <div style={{ marginBottom: 16 }}><Logo dark size={0.85} /></div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 240, marginBottom: 14 }}>Professional tutoring & test prep for Brooklyn students — in-person and online.</p>
              <a href="https://www.instagram.com/smartwaylearningcenter" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>📸 @smartwaylearningcenter</a>
            </div>
            <div>
              <h4 style={{ color: C.white, fontSize: 12, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Programs</h4>
              {["SHSAT Prep", "SAT Prep", "NY State Tests", "Regents", "FOCUS", "For Schools", "Point Store"].map((l) => <a key={l} href="#" style={{ display: "block", color: "#8a9ba3", textDecoration: "none", fontSize: 13.5, marginBottom: 9 }}>{l}</a>)}
            </div>
            <div>
              <h4 style={{ color: C.white, fontSize: 12, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Locations</h4>
              <div style={{ marginBottom: 16 }}><div style={{ color: "#c8d5cd", fontWeight: 700, fontSize: 13.5, marginBottom: 3 }}>Brooklyn, Midwood</div><div style={{ fontSize: 12.5 }}>803 Kings Highway, NY 11223</div></div>
              <div><div style={{ color: "#c8d5cd", fontWeight: 700, fontSize: 13.5, marginBottom: 3 }}>Online Sessions</div><div style={{ fontSize: 12.5 }}>Available via Zoom</div></div>
            </div>
            <div>
              <h4 style={{ color: C.white, fontSize: 12, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</h4>
              <a href="tel:(347) 926-8575" style={{ display: "block", color: "#c8d5cd", textDecoration: "none", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>📞 (347) 926-8575</a>
              <a href="mailto:Smartwaylearningcenter@gmail.com" style={{ display: "block", color: "#c8d5cd", textDecoration: "none", fontSize: 13, marginBottom: 10 }}>✉️ Email Us</a>
              <a href="https://www.instagram.com/smartwaylearningcenter" style={{ display: "block", color: "#c8d5cd", textDecoration: "none", fontSize: 13, marginBottom: 16 }}>📸 Instagram</a>
              <Btn onClick={onStartToday} variant="primary" style={{ padding: "8px 18px", fontSize: 12 }}>Start Today →</Btn>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.navyLight}`, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12 }}>
            <span>© 2025 Smart Way Learning Center. All rights reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>{["About", "Contact"].map((l) => <a key={l} href="#" style={{ color: "#8a9ba3", textDecoration: "none" }}>{l}</a>)}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
