import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { C } from '../utils/constants';
import { Reveal, Btn } from '../components/UI';

export default function SHSATPage({ onStartToday }) {
  const [scholarshipOpen, setScholarshipOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* ═══ SCHOLARSHIP MODAL ═══ */}
      {scholarshipOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setScholarshipOpen(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)" }} />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", background: C.white, borderRadius: 28, width: "100%", maxWidth: 720,
              maxHeight: "90vh", overflowY: "auto", boxShadow: "0 40px 100px rgba(0,0,0,.25)",
            }}
          >
            {/* Modal Header */}
            <div style={{
              position: "sticky", top: 0, zIndex: 2, background: C.white, borderRadius: "28px 28px 0 0",
              borderBottom: `1px solid ${C.greenPale}`,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                padding: "28px 32px", borderRadius: "28px 28px 0 0", position: "relative",
              }}>
                <button
                  onClick={() => setScholarshipOpen(false)}
                  style={{
                    position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,.15)",
                    border: "none", width: 36, height: 36, borderRadius: 50, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: C.white,
                  }}
                >✕</button>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
                <h2 style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                  SHSAT Scholarship Program
                </h2>
                <p style={{ fontSize: 13, color: "rgba(26,35,50,.6)", marginTop: 6 }}>Smart Way Learning Center</p>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "28px 32px 36px" }}>
              <p style={{ fontSize: 14.5, color: C.gray700, lineHeight: 1.8, marginBottom: 24 }}>
                At Smart Way Learning Center, we are committed to supporting our students' academic achievements and helping them reach their highest potential. To encourage and reward excellence, we are proud to introduce the Smart Way Learning Center SHSAT Scholarship Program. This scholarship is designed to provide financial assistance to outstanding students who excel in the Specialized High Schools Admissions Test (SHSAT).
              </p>

              {/* Key Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                <div style={{ background: `${C.gold}10`, borderRadius: 16, padding: "20px", textAlign: "center", border: `1px solid ${C.gold}20` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 800, color: C.goldDark }}>5%</div>
                  <div style={{ fontSize: 12, color: C.gray500, marginTop: 4, fontWeight: 600 }}>of all earnings added weekly</div>
                </div>
                <div style={{ background: `${C.green}08`, borderRadius: 16, padding: "20px", textAlign: "center", border: `1px solid ${C.greenPale}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 800, color: C.greenDeep }}>600+</div>
                  <div style={{ fontSize: 12, color: C.gray500, marginTop: 4, fontWeight: 600 }}>Score to qualify</div>
                </div>
              </div>

              {/* Scholarship Fund */}
              <div style={{ background: `${C.green}05`, borderRadius: 16, padding: "20px 22px", border: `1px solid ${C.greenPale}`, marginBottom: 28 }}>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: C.greenDeep, marginBottom: 8 }}>💰 Scholarship Fund</h4>
                <p style={{ fontSize: 13.5, color: C.gray700, lineHeight: 1.7 }}>
                  The scholarship fund starts with $500 of initial funding from our founder, Roman Melikov. To further support this initiative, 5% of the earnings from each SHSAT prep class conducted by Smart Way Learning Center will be added to the scholarship fund.
                </p>
              </div>

              {/* Eligibility Criteria */}
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: C.greenDeep, marginBottom: 18 }}>Eligibility Criteria</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  { title: "Enrollment Requirement", desc: "Students must be enrolled in Smart Way Learning Center for at least 1 month prior to taking the SHSAT. This ensures that students have sufficient time to benefit from our comprehensive SHSAT prep program." },
                  { title: "Score Requirement", desc: "Students must achieve a score of 600 points or more on the SHSAT. This benchmark signifies a high level of proficiency and readiness for specialized high schools." },
                  { title: "Proof of Score", desc: "Students must provide official proof of their SHSAT score to verify their eligibility for the scholarship. This can be a copy of the official score report issued by the testing authority." },
                  { title: "Prize Distribution", desc: "If more than one student scores 600 points or more, the prize money will be split equally among the qualifying students. This ensures that all high-achieving students receive recognition and support." },
                  { title: "Attendance Requirement", desc: "Students must have attended at least 80% of their scheduled SHSAT prep classes. Consistent attendance demonstrates commitment and maximizes the benefits of our prep program." },
                  { title: "Continuous Enrollment", desc: "Students must remain continuously enrolled in the SHSAT prep program until the scholarship is awarded. This rule ensures ongoing engagement and effort in preparation for the SHSAT." },
                  { title: "Good Standing", desc: "Students must be in good academic and behavioral standing within Smart Way Learning Center. This includes maintaining a positive attitude, respecting peers and instructors, and demonstrating a strong work ethic." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", borderRadius: 14, background: C.offWhite, border: `1px solid ${C.greenPale}` }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, background: `${C.green}12`, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: C.green, marginTop: 1,
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900, marginBottom: 3 }}>{item.title}</div>
                      <p style={{ fontSize: 13, color: C.gray500, lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Process Section */}
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: C.greenDeep, marginBottom: 18 }}>Application Process</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  { icon: "📋", title: "Application", desc: "Students must complete a scholarship application form and submit it along with their proof of score." },
                  { icon: "💰", title: "Scholarship Fund Growth", desc: "The scholarship fund will grow by 5% of earnings from each SHSAT prep class conducted by Smart Way Learning Center." },
                  { icon: "📢", title: "Announcement of Winners", desc: "Scholarship winners will be announced within one month of receiving the official SHSAT scores." },
                  { icon: "🎉", title: "Official Ceremony", desc: "There will be an official ceremony held within 2 weeks after the results are posted to honor all the scholarship recipients and other high-achieving students." },
                  { icon: "🎓", title: "Use of Scholarship", desc: "Scholarship funds can be used for educational purposes such as tuition, books, electronics or other school-related expenses." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", borderRadius: 14, background: `${C.gold}05`, border: `1px solid ${C.gold}12` }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900, marginBottom: 3 }}>{item.title}</div>
                      <p style={{ fontSize: 13, color: C.gray500, lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Notes */}
              <div style={{ background: C.gray100, borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, color: C.gray900, marginBottom: 10 }}>Additional Notes</h4>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li style={{ fontSize: 13, color: C.gray500, lineHeight: 1.7, marginBottom: 6 }}>The scholarship aims to encourage and reward high-achieving students.</li>
                  <li style={{ fontSize: 13, color: C.gray500, lineHeight: 1.7, marginBottom: 6 }}>All decisions regarding scholarship awards are final and at the discretion of Smart Way Learning Center administration.</li>
                </ul>
              </div>

              <p style={{ fontSize: 11.5, color: C.gray500, lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
                Disclaimer: Smart Way Learning Center is not legally responsible for the use of the scholarship funds once awarded. It is the responsibility of the recipient to use the funds appropriately for their educational purposes.
              </p>

              <p style={{ fontSize: 14, color: C.gray700, lineHeight: 1.7, marginBottom: 28 }}>
                We are excited to offer this scholarship program as a testament to our dedication to academic excellence. We believe that by supporting our students in their pursuit of excellence, we are investing in the future.
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn onClick={() => { setScholarshipOpen(false); onStartToday(); }} variant="primary" style={{ padding: "12px 28px", fontSize: 14 }}>Register for SHSAT Prep →</Btn>
                <Btn onClick={() => setScholarshipOpen(false)} variant="outline" style={{ padding: "12px 28px", fontSize: 14 }}>Close</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(160deg, ${C.greenDeep} 0%, #0a3d22 40%, #0d4a28 100%)`,
        position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80,
      }}>
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: `${C.green}18`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `${C.gold}10`, filter: "blur(100px)" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", padding: "7px 18px 7px 10px", borderRadius: 60, marginBottom: 28 }}>
              <span style={{ width: 26, height: 26, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${C.gold}25`, fontSize: 12 }}>🎯</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.gold }}>Now Enrolling 2025–2026</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: 72, fontWeight: 700, color: C.white, lineHeight: 1.05, marginBottom: 20 }}>
              SHSAT
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,.7)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
              Comprehensive preparation for the Specialized High Schools Admissions Test — helping Brooklyn students earn their spot at NYC's top schools.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={onStartToday} variant="gold" style={{ padding: "14px 32px", fontSize: 15 }}>Register Now</Btn>
              <Btn href="#about-test" variant="outline" style={{ padding: "14px 32px", fontSize: 15, color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>Learn About the Test</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHAT YOU NEED TO KNOW ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// WHY START EARLY</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>What You Need to Know</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { icon: "🚀", title: "Early Advantage", desc: "Begin early for a 100-point score boost on average.", accent: C.green },
              { icon: "😌", title: "Less Stress", desc: "Reduce last-minute cramming and stress.", accent: C.purple },
              { icon: "📈", title: "Higher Success", desc: "85% acceptance rate into specialized high schools.", accent: C.gold },
              { icon: "📅", title: "Flexibility", desc: "Schedule-friendly 7th-grade program.", accent: C.coral },
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
      <section style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.white}, ${C.greenMist})` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.greenDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// SCHEDULE</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>2025–2026 Class Schedule</h2>
              <p style={{ color: C.gray500, fontSize: 15, marginTop: 12 }}>In-Person Program — 3 hours per week</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {/* In-Person Session */}
            <Reveal delay={0.1}>
              <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}`, height: "100%" }}>
                <div style={{ background: C.greenDeep, padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📚</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.white }}>SHSAT ELA + Math</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 2 }}>In-Person Session</div>
                  </div>
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 18 }}>📅</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900 }}>Sunday</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: C.green }}>10:30 AM – 12:30 PM</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 18 }}>📍</span>
                    <div style={{ fontSize: 14, color: C.gray500 }}>803 Kings Hwy, Brooklyn</div>
                  </div>
                  <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.7, padding: "16px", borderRadius: 14, background: `${C.green}05`, border: `1px solid ${C.greenPale}` }}>
                    This in-person class combines ELA and Math preparation into a 2-hour session. Students focus on mastering critical ELA and Math skills, preparing comprehensively for the SHSAT exam.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Online Session */}
            <Reveal delay={0.2}>
              <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}`, height: "100%" }}>
                <div style={{ background: `linear-gradient(135deg, #1a5c99, #1a4278)`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖥️</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.white }}>SHSAT Math</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 2 }}>Online via Zoom — FREE</div>
                  </div>
                  <div style={{ marginLeft: "auto", background: `${C.gold}`, color: C.navy, fontWeight: 800, fontSize: 11, padding: "4px 10px", borderRadius: 50, textTransform: "uppercase" }}>Free</div>
                </div>
                <div style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 18 }}>📅</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900 }}>Tuesday</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: "#1a5c99" }}>7:30 PM – 8:30 PM</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 18 }}>🌐</span>
                    <div style={{ fontSize: 14, color: C.gray500 }}>Online via Zoom</div>
                  </div>
                  <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.7, padding: "16px", borderRadius: 14, background: "#1a5c9908", border: "1px solid #1a5c9910" }}>
                    A free, online 1-hour session dedicated to enhancing Math skills. This session provides additional practice and Q&A support to strengthen core competencies in SHSAT Math.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Price Banner */}
          <Reveal delay={0.25}>
            <div style={{
              marginTop: 36, background: C.white, borderRadius: 20, padding: "28px 36px",
              border: `2px solid ${C.greenPale}`, display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 13, color: C.gray500, fontWeight: 600, marginBottom: 4 }}>Monthly Tuition</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 800, color: C.greenDeep }}>$390</span>
                  <span style={{ fontSize: 15, color: C.gray500 }}>/ month</span>
                </div>
                <div style={{ fontSize: 13, color: C.gray500, marginTop: 4 }}>Includes in-person + free online sessions</div>
              </div>
              <Btn onClick={onStartToday} variant="primary" style={{ padding: "14px 36px", fontSize: 15 }}>Register Now →</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ OUR PROGRAM ═══ */}
      <section style={{ padding: "88px 48px", background: C.greenDeep, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: `${C.green}12`, filter: "blur(120px)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// WHAT'S INCLUDED</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.white, marginTop: 10 }}>Our Program</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {/* Materials */}
            <Reveal delay={0.1}>
              <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)", height: "100%" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: `${C.gold}15`, marginBottom: 20 }}>📦</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>All Materials Included</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
                  Our comprehensive materials include practice exams, study guides, textbooks, and other resources to help students master the skills and concepts tested on the SHSAT.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["1000+ Practice Questions", "2 Full Mock Tests", "Study Video Content"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.06)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
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
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>In-Person SHSAT Prep Classes</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
                  SHSAT Prep Classes in a Classroom Setting, where we maintain small groups of no more than 8 students for personalized attention and effective learning.
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                  borderRadius: 16, background: `${C.green}15`, border: `1px solid ${C.green}20`,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 800, color: C.gold }}>≤8</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.white }}>Students Per Group</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Real attention, faster progress</div>
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
                  Our instructors are experienced and knowledgeable in teaching the skills and concepts needed to succeed on the SHSAT.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Specialized SHSAT curriculum expertise", "Proven track record of student success", "Personalized feedback & guidance"].map((item) => (
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

      {/* ═══ SHSAT GROUPS / JOURNEY ═══ */}
      <section style={{ padding: "88px 48px", background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// OUR GROUPS</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Follow Our SHSAT Journey</h2>
              <p style={{ color: C.gray500, fontSize: 15, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
                Join us as we embark on an exciting and rigorous journey to master the SHSAT. Our program is divided into two dynamic groups.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48 }}>
            {[
              { title: "Weekly Program", icon: "📋", desc: "Discover the topics and skills each group is working on." },
              { title: "Homework Assignments", icon: "📝", desc: "View and download weekly assignments to practice and reinforce learning." },
              { title: "Progress Updates", icon: "📊", desc: "Follow along with the achievements and milestones of each group." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div style={{
                  background: C.white, borderRadius: 20, padding: "28px 24px",
                  border: `1px solid ${C.greenPale}`, display: "flex", gap: 16, alignItems: "flex-start",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${C.green}08`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: `${C.green}08`, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 16, color: C.gray900, marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontSize: 13.5, color: C.gray500, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Scholarship Banner */}
          <Reveal delay={0.3}>
            <div style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, borderRadius: 20,
              padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Current SHSAT Scholarship</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 700, color: C.navy }}>$999.99</div>
              </div>
              <Btn onClick={() => setScholarshipOpen(true)} variant="dark" style={{ padding: "12px 28px", fontSize: 14 }}>How to Participate →</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "88px 48px", background: C.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// SUCCESS STORIES</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>Students of Specialized High Schools Say</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              { name: "Alison S.", stars: 5, text: "Prepared for the SHSAT. I like how Roman explains math a lot!", time: "5 years ago" },
              { name: "Anatoliy S.", stars: 5, text: "My daughter got her SHSAT results and her score was 574! This would have been enough for Stuyvesant! She however, really liked Brooklyn Tech and got into only that specialized school on her list. Many thanks to Roman for all his work with her last year, it clearly helped her during the test and still is quite helpful in 9th grade!", time: "3 years ago" },
              { name: "Jackson", stars: 5, text: "Great tutoring place. This help me prepare for the SHSAT!", time: "2 years ago" },
            ].map((review, i) => (
              <Reveal key={review.name} delay={i * 0.1}>
                <div style={{
                  background: C.offWhite, borderRadius: 20, padding: "28px 24px",
                  border: `1px solid ${C.greenPale}`, height: "100%",
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", background: `${C.green}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 18, color: C.greenDeep,
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
                      <span key={j} style={{ fontSize: 16, color: C.gold }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: C.gray700, lineHeight: 1.7, flex: 1 }}>"{review.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT THE TEST ═══ */}
      <section id="about-test" style={{ padding: "88px 48px", background: `linear-gradient(180deg, ${C.greenMist}, ${C.offWhite})` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.greenDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>// LEARN MORE</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: C.greenDeep, marginTop: 10 }}>About the Test</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              background: C.white, borderRadius: 24, padding: "40px 36px",
              border: `1px solid ${C.greenPale}`, boxShadow: `0 8px 32px ${C.green}06`,
            }}>
              <p style={{ fontSize: 15.5, color: C.gray700, lineHeight: 1.85, marginBottom: 24 }}>
                The Specialized High Schools Admissions Test (SHSAT) is an exam administered to 8th and 9th-grade students in New York City who are interested in attending one of the city's specialized high schools. The test measures a student's ability in math and English language arts and is the sole factor in determining admission to these highly competitive schools.
              </p>
              <p style={{ fontSize: 15.5, color: C.gray700, lineHeight: 1.85, marginBottom: 28 }}>
                Attending a specialized high school can offer students unique educational opportunities and access to rigorous academic programs. Additionally, a diploma from one of these schools can provide students with a competitive edge in the college admissions process and in their future careers. Therefore, it is important for students to prepare well for the SHSAT and to perform at their best on the exam.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "Stuyvesant", icon: "🏫" },
                  { label: "Bronx Science", icon: "🔬" },
                  { label: "Brooklyn Tech", icon: "⚙️" },
                  { label: "Brooklyn Latin", icon: "📜" },
                  { label: "HSMSE at CCNY", icon: "📐" },
                  { label: "HSAS at Lehman", icon: "🎨" },
                  { label: "Queens HS for Sciences", icon: "🧬" },
                  { label: "SI Technical", icon: "💻" },
                ].map((school) => (
                  <div key={school.label} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    borderRadius: 12, background: `${C.green}05`, border: `1px solid ${C.greenPale}`,
                  }}>
                    <span style={{ fontSize: 16 }}>{school.icon}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: C.gray700 }}>{school.label}</span>
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
        background: `linear-gradient(160deg, ${C.greenDeep}, #0a3d22)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 40, fontWeight: 700, color: C.white, marginBottom: 16, lineHeight: 1.2 }}>
              Ready to Start Your SHSAT Journey?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 36 }}>
              Spots are limited — small groups of 8 or fewer. Register today to secure your child's place and give them the best preparation for NYC's top specialized high schools.
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
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
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
