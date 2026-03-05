import React, { useState } from 'react';
import { C } from '../utils/constants';
import DB from '../utils/db';
import { Modal, Input, Btn } from './UI';

const CLASS_OPTIONS = [
  "Math", "ELA/English", "SHSAT PREP", "SAT PREP",
  "Algebra 1", "HS Geometry", "Physics", "Biology",
];

const URGENCY_OPTIONS = [
  "Immediately", "Within a week", "Within a month", "Just exploring",
];

const SCHOOL_LEVELS = [
  "Elementary (K–5)", "Middle School (6–8)", "High School (9–12)",
];

export default function AuthModal({ open, onClose }) {
  const [role, setRole] = useState("");
  const [urgency, setUrgency] = useState("");
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [format, setFormat] = useState("");
  const [groupType, setGroupType] = useState("");
  const [terms, setTerms] = useState(false);
  const [err, setErr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setRole(""); setUrgency(""); setClasses([]); setName(""); setPhone("");
    setEmail(""); setSchoolLevel(""); setFormat(""); setGroupType("");
    setTerms(false); setErr(""); setSubmitted(false);
  };

  const toggleClass = (c) => {
    setClasses((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const handleSubmit = async () => {
    setErr("");
    if (!role || !urgency || classes.length === 0 || !name || !phone || !email || !schoolLevel || !format || !groupType) {
      setErr("Please fill in all required fields.");
      return;
    }
    if (!terms) {
      setErr("Please accept the terms & conditions.");
      return;
    }
    setLoading(true);

    const formData = {
      _subject: `New Inquiry from ${name}`,
      "I am": role,
      "How soon": urgency,
      "Classes": classes.join(", "),
      "Full Name": name,
      "Phone": phone,
      "Email": email,
      "School Level": schoolLevel,
      "Format": format,
      "Class Type": groupType,
      "Submitted": new Date().toLocaleString(),
    };

    try {
      // Send email via Formsubmit (client-side) + log to Vercel (server-side) in parallel
      const [emailRes] = await Promise.all([
        fetch("https://formsubmit.co/ajax/8199b01b969ec8b76c71bd2a10c63d33", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData),
        }),
        fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).catch(() => {}), // logging is best-effort
      ]);

      const emailData = await emailRes.json();
      console.log("Formsubmit status:", emailRes.status);
      console.log("Formsubmit response:", emailData);

      if (emailRes.ok && emailData.success) {
        const entry = {
          id: `inq_${Date.now()}`, role, urgency, classes, name, phone, email,
          schoolLevel, format, groupType, createdAt: new Date().toISOString(),
        };
        const inquiries = DB.get("sw-inquiries") || [];
        inquiries.push(entry);
        DB.set("sw-inquiries", inquiries);
        setSubmitted(true);
      } else {
        setErr("Failed to send. Please try again.");
      }
    } catch (e) {
      setErr("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 8 };
  const radioOuter = (selected) => ({
    width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? C.green : C.gray300}`,
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
  });
  const radioDot = { width: 10, height: 10, borderRadius: "50%", background: C.green };
  const checkboxStyle = (checked) => ({
    width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? C.green : C.gray300}`,
    background: checked ? C.green : "transparent", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", flexShrink: 0,
  });
  const selectStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${C.gray300}`,
    fontSize: 15, fontFamily: "'Outfit', sans-serif", background: `${C.greenPale}40`,
    boxSizing: "border-box", color: C.gray900, outline: "none",
  };

  if (submitted) {
    return (
      <Modal open={open} onClose={() => { reset(); onClose(); }} title="You're All Set!" width={520}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep, marginBottom: 10 }}>
            Thank you, {name}!
          </h3>
          <p style={{ color: C.gray500, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            We've received your inquiry and will reach out to you soon at <strong style={{ color: C.gray700 }}>{email}</strong> to get you started.
          </p>
          <Btn onClick={() => { reset(); onClose(); }} variant="primary" style={{ padding: "12px 32px" }}>
            Done
          </Btn>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} title="Start Today" width={580}>
      <p style={{ color: C.gray500, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Fill out your info, pick a class and grade, and hit send! We'll reach out to you soon to get started.
      </p>

      {err && (
        <div style={{
          background: `${C.coral}10`, color: C.coral, padding: "10px 16px",
          borderRadius: 12, fontSize: 13, fontWeight: 600, marginBottom: 16,
        }}>
          {err}
        </div>
      )}

      {/* I am */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>I am: *</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Parent", "Student"].map((r) => (
            <div key={r} onClick={() => setRole(r)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={radioOuter(role === r)}>{role === r && <div style={radioDot} />}</div>
              <span style={{ fontSize: 15, fontWeight: 500, color: C.gray900 }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How soon */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>How soon do you need help? *</label>
        <select value={urgency} onChange={(e) => setUrgency(e.target.value)} style={selectStyle}>
          <option value="">Choose an Option</option>
          {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Select Class */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Select Class (You may choose more than one if needed) *</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CLASS_OPTIONS.map((c) => (
            <div key={c} onClick={() => toggleClass(c)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={checkboxStyle(classes.includes(c))}>
                {classes.includes(c) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, color: C.gray900 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Name + Phone row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 4 }}>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}><Input label="Full name *" value={name} onChange={setName} placeholder="Add your full name here" /></div>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}><Input label="Phone *" value={phone} onChange={setPhone} placeholder="Phone" /></div>
      </div>

      {/* Email + School Level row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 4 }}>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}><Input label="Email *" type="email" value={email} onChange={setEmail} placeholder="e.g., email@example.com" /></div>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>School Level *</label>
            <select value={schoolLevel} onChange={(e) => setSchoolLevel(e.target.value)} style={selectStyle}>
              <option value="">Choose an option</option>
              {SCHOOL_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Format: Remote / In Person + Private / Group */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 20 }}>
        <div style={{ minWidth: 0 }}>
          <label style={labelStyle}>Select a Format *</label>
          <div style={{ display: "flex", gap: 16 }}>
            {["Remote", "In Person"].map((f) => (
              <div key={f} onClick={() => setFormat(f)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <div style={radioOuter(format === f)}>{format === f && <div style={radioDot} />}</div>
                <span style={{ fontSize: 14, fontWeight: 500, color: C.gray900 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <label style={labelStyle}>Class Type *</label>
          <div style={{ display: "flex", gap: 16 }}>
            {["PRIVATE", "GROUP"].map((g) => (
              <div key={g} onClick={() => setGroupType(g)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <div style={radioOuter(groupType === g)}>{groupType === g && <div style={radioDot} />}</div>
                <span style={{ fontSize: 14, fontWeight: 500, color: C.gray900 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <div onClick={() => setTerms(!terms)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 20 }}>
        <div style={radioOuter(terms)}>{terms && <div style={radioDot} />}</div>
        <span style={{ fontSize: 13, color: C.gray500 }}>I accept terms & conditions</span>
      </div>

      {/* Send button */}
      <Btn
        onClick={handleSubmit}
        variant="primary"
        style={{
          background: "#f06030", padding: "14px 0", fontSize: 15, width: "100%",
          justifyContent: "center", boxShadow: "0 4px 16px rgba(240,96,48,.3)",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Sending..." : "Send"}
      </Btn>
    </Modal>
  );
}
