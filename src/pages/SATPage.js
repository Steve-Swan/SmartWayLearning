import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C } from '../utils/constants';
import { Reveal, Btn } from '../components/UI';

const A = C.gold;       // primary accent
const AD = C.goldDark;  // dark accent

export default function SATPage({ onStartToday }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(160deg, #2a1f0a 0%, #3d2e10 40%, #4a3815 100%)`,
        position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: `${A}18`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `${C.green}10`, filter: "blur(100px)" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", padding: "7px 18px 7px 10px", borderRadius: 60, marginBottom: 28 }}>
              <span style={{ width: 26, height: 26, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${A}25`, fontSize: 12 }}>📝</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: A }}>Now Enrolling 2025–2026</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: 72, fontWeight: 700, color: C.white, lineHeight: 1.05, marginBottom: 20 }}>
              SAT Prep
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,.7)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
              Comprehensive Math and ELA preparation for the SAT — in-person classes in Brooklyn with free online sessions included.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={onStartToday} variant="gold" style={{ padding: "14px 32px", fontSize: 15 }}>Register Now</Btn>
              <Btn href="#about-sat" variant="outline" style={{ padding: "14px 32px", fontSize: 15, color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>Learn About the SAT</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY PREPARE ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// WHY PREPARE</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>What You Need to Know</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { icon: "🎓", title: "College Admissions", desc: "A strong SAT score opens doors to top colleges and scholarship opportunities nationwide.", accent: A },
              { icon: "📊", title: "Score Improvement", desc: "Students who prepare see an average 150–200 point increase over their baseline scores.", accent: C.green },
              { icon: "💰", title: "Scholarship Access", desc: "High SAT scores can unlock thousands of dollars in merit-based scholarships.", accent: C.coral },
              { icon: "🧠", title: "Strategy & Confidence", desc: "Learn proven test-taking strategies that reduce anxiety and maximize performance.", accent: C.purple },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div style={{
                  background: C.white, borderRadius: 24, padding: "36px 28px",
                  border: `1px solid ${C.greenPale}`, height: "100%",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 48px ${item.accent}12`; e.currentTarget.style.borderColor = `${item.accent}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.greenPale; }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: `${item.accent}10`, marginBottom: 18 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: C.greenDeep, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14.5, color: C.gray500, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLASS SCHEDULE ═══ */}
      <section style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.white}, #fdf6e8)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: AD, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// SCHEDULE</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>2025–2026 Class Schedule</h2>
              <p style={{ color: C.gray500, fontSize: 15, marginTop: 12 }}>In-Person + Online Program — 3 hours per week</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {/* In-Person Session */}
            <Reveal delay={0.1}>
              <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${A}15`, height: "100%" }}>
                <div style={{ background: `linear-gradient(135deg, #8a6a1a, ${AD})`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📚</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.white }}>SAT Math + ELA</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 2 }}>In-Person Session</div>
                  </div>
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 18 }}>📅</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900 }}>Sunday</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: AD }}>6:00 PM – 8:00 PM</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 18 }}>📍</span>
                    <div style={{ fontSize: 14, color: C.gray500 }}>803 Kings Hwy, Brooklyn</div>
                  </div>
                  <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.7, padding: "16px", borderRadius: 14, background: `${A}06`, border: `1px solid ${A}10` }}>
                    A comprehensive 2-hour in-person session covering both SAT Math and ELA. Students build core skills, learn test strategies, and work through practice problems in a focused classroom setting.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Online Session */}
            <Reveal delay={0.2}>
              <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${A}15`, height: "100%" }}>
                <div style={{ background: `linear-gradient(135deg, #1a5c99, #1a4278)`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖥️</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.white }}>SAT Math</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 2 }}>Online via Zoom — FREE</div>
                  </div>
                  <div style={{ marginLeft: "auto", background: A, color: C.navy, fontWeight: 800, fontSize: 11, padding: "4px 10px", borderRadius: 50, textTransform: "uppercase" }}>Free</div>
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 18 }}>📅</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900 }}>Wednesday</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: "#1a5c99" }}>8:00 PM – 9:00 PM</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 18 }}>🌐</span>
                    <div style={{ fontSize: 14, color: C.gray500 }}>Online via Zoom</div>
                  </div>
                  <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.7, padding: "16px", borderRadius: 14, background: "#1a5c9908", border: "1px solid #1a5c9910" }}>
                    A free, online 1-hour session dedicated to SAT Math. This session provides additional practice, problem-solving techniques, and Q&A support to strengthen your math score.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Price Banner */}
          <Reveal delay={0.25}>
            <div style={{
              marginTop: 36, background: C.white, borderRadius: 20, padding: "28px 36px",
              border: `2px solid ${A}20`, display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 13, color: C.gray500, fontWeight: 600, marginBottom: 4 }}>Monthly Tuition</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 800, color: AD }}>$390</span>
                  <span style={{ fontSize: 15, color: C.gray500 }}>/ month</span>
                </div>
                <div style={{ fontSize: 13, color: C.gray500, marginTop: 4 }}>Includes in-person Sunday + free online Wednesday sessions</div>
              </div>
              <Btn onClick={onStartToday} variant="gold" style={{ padding: "14px 36px", fontSize: 15 }}>Register Now →</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ OUR PROGRAM ═══ */}
      <section style={{ padding: "88px 48px", background: `linear-gradient(160deg, #2a1f0a, #3d2e10)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: `${A}12`, filter: "blur(120px)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// WHAT'S INCLUDED</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.white, marginTop: 10 }}>Our Program</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {/* Materials */}
            <Reveal delay={0.1}>
              <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)", height: "100%" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: `${A}15`, marginBottom: 20 }}>📦</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>All Materials Included</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
                  Everything you need to succeed — practice tests, study guides, and supplementary materials covering all SAT Math and ELA topics.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["38 Computer-Based SAT Tests (Instant Scores)", "Official & Practice SAT Tests", "Comprehensive Study Guides", "Strategy Worksheets & Drills", "Free Online Math Sessions"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.06)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Small Groups */}
            <Reveal delay={0.2}>
              <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)", height: "100%" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: `${C.green}20`, marginBottom: 20 }}>👥</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>Small Group Classes</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
                  Our SAT prep classes are held in a focused classroom setting with small groups for personalized attention and effective learning.
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                  borderRadius: 16, background: `${A}10`, border: `1px solid ${A}15`,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 800, color: A }}>≤8</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.white }}>Students Per Group</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Personalized attention guaranteed</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Expert Instructors */}
            <Reveal delay={0.3}>
              <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)", height: "100%" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: `${C.coral}15`, marginBottom: 20 }}>👨‍🏫</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>Expert Instructors</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
                  Our instructors specialize in SAT preparation and know exactly what it takes to boost your score.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Deep understanding of SAT format & scoring", "Proven strategies for Math & ELA sections", "Personalized feedback on practice tests"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.06)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <Btn onClick={onStartToday} variant="gold" style={{ padding: "14px 36px", fontSize: 15 }}>Register Now →</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SAT SECTIONS BREAKDOWN ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// TEST BREAKDOWN</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>What We Cover</h2>
              <p style={{ color: C.gray500, fontSize: 15, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
                Our program covers every section of the SAT with targeted instruction and practice.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {/* Math */}
            <Reveal delay={0.1}>
              <div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${A}15`, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: `${A}10` }}>🔢</div>
                  <div>
                    <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep }}>SAT Math</h3>
                    <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>Sections 3 & 4</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Algebra", "Problem Solving", "Advanced Math", "Geometry & Trig", "Data Analysis", "Word Problems"].map((t) => (
                    <span key={t} style={{ padding: "7px 14px", borderRadius: 50, fontSize: 12.5, fontWeight: 600, background: `${A}08`, color: AD }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ELA */}
            <Reveal delay={0.2}>
              <div style={{ background: C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${C.green}15`, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: `${C.green}10` }}>📖</div>
                  <div>
                    <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep }}>SAT Reading & Writing</h3>
                    <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>Sections 1 & 2</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Reading Comprehension", "Evidence-Based Questions", "Grammar & Usage", "Vocabulary in Context", "Rhetoric & Synthesis", "Passage Analysis"].map((t) => (
                    <span key={t} style={{ padding: "7px 14px", borderRadius: 50, fontSize: 12.5, fontWeight: 600, background: `${C.green}08`, color: C.greenDark }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PRACTICE PORTAL ═══ */}
      <section style={{
        padding: "72px 48px",
        background: `linear-gradient(160deg, ${C.navy}, #1a2332)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: `linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: `${A}10`, filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 250, height: 250, borderRadius: "50%", background: `${C.purple}08`, filter: "blur(80px)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            {/* Left — Info */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${A}15`, padding: "6px 14px 6px 8px", borderRadius: 50, marginBottom: 20 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${A}25`, fontSize: 12 }}>💻</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em" }}>Student Portal</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 style={{ fontFamily: "'Lora', serif", fontSize: 36, fontWeight: 700, color: C.white, lineHeight: 1.15, marginBottom: 14 }}>
                  SAT Practice Portal
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
                  Access 38 full-length computer-based SAT practice tests with instant scoring. Simulate real test-day conditions, track your progress, and pinpoint areas to improve.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                  {["38 Full Tests", "Instant Scores", "Progress Tracking", "Real Test Format"].map((tag) => (
                    <span key={tag} style={{
                      padding: "8px 16px", borderRadius: 50, fontSize: 12.5, fontWeight: 600,
                      background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.7)",
                      border: "1px solid rgba(255,255,255,.08)",
                    }}>{tag}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <Btn href="https://smartwaylearning.practicetest.io/sign-in" variant="gold" style={{ padding: "14px 36px", fontSize: 15 }}>Log In to Portal →</Btn>
              </Reveal>
            </div>

            {/* Right — Visual Card */}
            <Reveal delay={0.15}>
              <div style={{
                background: "rgba(255,255,255,.04)", borderRadius: 24, padding: "36px 32px",
                border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)",
                minWidth: 280, maxWidth: 360,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${A}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📊</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.white }}>Your Dashboard</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>Track scores & improvement</div>
                  </div>
                </div>
                {[
                  { label: "Practice Tests", value: "38", color: A },
                  { label: "Avg. Score Boost", value: "+150 pts", color: C.green },
                  { label: "Scoring", value: "Instant", color: C.coral },
                ].map((stat) => (
                  <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.5)" }}>{stat.label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.3)", marginTop: 16, lineHeight: 1.5 }}>
                  Available exclusively to enrolled Smart Way students.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PRIVATE TUTORING ═══ */}
      <section style={{ padding: "88px 48px", background: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.green}08`, padding: "6px 14px 6px 8px", borderRadius: 50, marginBottom: 20 }}>
              <span style={{ width: 24, height: 24, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${C.green}15`, fontSize: 12 }}>👤</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em" }}>1-on-1 Sessions</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.greenDeep, lineHeight: 1.15, marginBottom: 16 }}>
              Looking for Private Tutoring?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: 16, color: C.gray500, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
              Prefer one-on-one attention? We offer private SAT tutoring sessions tailored to your specific needs, schedule, and target score — in-person in Brooklyn or online via Zoom.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40, maxWidth: 700, margin: "0 auto 40px" }}>
              {[
                { icon: "🎯", title: "Personalized Plan", desc: "Customized to your strengths and weaknesses" },
                { icon: "📅", title: "Flexible Schedule", desc: "Book sessions that fit your calendar" },
                { icon: "🏢", title: "In-Person or Online", desc: "Brooklyn location or Zoom — your choice" },
              ].map((item) => (
                <div key={item.title} style={{
                  background: C.offWhite, borderRadius: 18, padding: "24px 20px",
                  border: `1px solid ${C.greenPale}`, textAlign: "center",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12.5, color: C.gray500, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={onStartToday} variant="primary" style={{ padding: "14px 32px", fontSize: 15 }}>Get Started →</Btn>
              <Btn href="tel:(347) 926-8575" variant="outline" style={{ padding: "14px 32px", fontSize: 15 }}>📞 (347) 926-8575</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// STUDENT SUCCESS</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>What Students Say</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              { name: "Alison S.", stars: 5, text: "The SAT prep at Smart Way was excellent. Roman explains math concepts in a way that actually makes sense. I felt fully prepared on test day.", time: "Student" },
              { name: "Jackson", stars: 5, text: "Great tutoring place! The small group setting made it easy to ask questions and get real help on the topics I struggled with.", time: "Student" },
              { name: "Anatoliy S.", stars: 5, text: "Many thanks to Roman for all his work. The combination of in-person and online sessions gave my child the practice they needed to succeed.", time: "Parent" },
            ].map((review, i) => (
              <Reveal key={review.name} delay={i * 0.1}>
                <div style={{
                  background: C.offWhite, borderRadius: 20, padding: "28px 24px",
                  border: `1px solid ${C.greenPale}`, height: "100%",
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", background: `${A}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 18, color: AD,
                    }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.gray900 }}>{review.name}</div>
                      <div style={{ fontSize: 11, color: C.gray500 }}>{review.time}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <span key={j} style={{ fontSize: 16, color: A }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: C.gray700, lineHeight: 1.7, flex: 1 }}>"{review.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT THE SAT ═══ */}
      <section id="about-sat" style={{ padding: "88px 48px", background: `linear-gradient(180deg, #fdf6e8, ${C.offWhite})` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: AD, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// LEARN MORE</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>About the SAT</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              background: C.white, borderRadius: 24, padding: "40px 36px",
              border: `1px solid ${A}15`, boxShadow: `0 8px 32px ${A}06`,
            }}>
              <p style={{ fontSize: 15.5, color: C.gray700, lineHeight: 1.85, marginBottom: 24 }}>
                The SAT is a standardized test widely used for college admissions in the United States. Administered by the College Board, the SAT measures a student's readiness for college and provides colleges with a common data point to compare applicants. The test covers Evidence-Based Reading and Writing, and Math.
              </p>
              <p style={{ fontSize: 15.5, color: C.gray700, lineHeight: 1.85, marginBottom: 28 }}>
                A strong SAT score can significantly impact college admissions decisions and scholarship opportunities. Many colleges use SAT scores as a key factor in their admissions process, and high scores can qualify students for merit-based financial aid. Preparing thoroughly for the SAT gives students the best chance at reaching their academic goals.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { label: "Total Score", value: "400–1600" },
                  { label: "Math Section", value: "200–800" },
                  { label: "Reading & Writing", value: "200–800" },
                  { label: "Test Duration", value: "~3 hours" },
                  { label: "Digital Format", value: "Since 2024" },
                  { label: "Adaptive Testing", value: "2 modules/section" },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    padding: "14px 16px", borderRadius: 14, background: `${A}06`, border: `1px solid ${A}10`, textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 16, color: AD }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: C.gray500, fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{
        padding: "88px 48px", textAlign: "center",
        background: `linear-gradient(160deg, #2a1f0a, #3d2e10)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.white, marginBottom: 16, lineHeight: 1.2 }}>
              Ready to Boost Your SAT Score?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 36 }}>
              Join our SAT prep program with in-person Sunday classes and free online Wednesday sessions. Small groups, expert instruction, and proven results.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={onStartToday} variant="gold" style={{ padding: "14px 36px", fontSize: 15 }}>Register Now →</Btn>
              <Btn href="tel:(347) 926-8575" variant="outline" style={{ padding: "14px 28px", fontSize: 15, color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>📞 Call Us</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: C.navy, padding: "48px 48px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginBottom: 16 }}>
            Smart Way Learning Center — 803 Kings Hwy, Brooklyn, NY
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="tel:(347) 926-8575" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 13 }}>📞 (347) 926-8575</a>
            <a href="mailto:Smartwaylearningcenter@gmail.com" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 13 }}>✉️ Email Us</a>
            <a href="https://www.instagram.com/smartwaylearningcenter" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 13 }}>📸 Instagram</a>
          </div>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: A, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", marginTop: 24, paddingTop: 20 }}>
            <p style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}>© 2025 Smart Way Learning Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
