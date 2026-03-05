import React, { useState } from 'react';
import { C, PROGRAMS } from '../utils/constants';
import DB from '../utils/db';
import { Modal, Input, Btn } from './UI';

export default function EnrollModal({ open, onClose, user, onEnroll }) {
  const [selected, setSelected] = useState("");
  const [studentName, setStudentName] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnroll = () => {
    if (!selected || !studentName) return;
    setLoading(true);
    const program = PROGRAMS.find((p) => p.id === selected);
    const enrollments = DB.get("sw-enrollments") || [];
    const enrollment = {
      id: `enr_${Date.now()}`,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      studentName,
      programId: selected,
      programName: program.name,
      programCat: program.cat,
      programPrice: program.price,
      notes,
      createdAt: new Date().toISOString(),
      status: "Active",
    };
    enrollments.push(enrollment);
    DB.set("sw-enrollments", enrollments);
    if (onEnroll) onEnroll(enrollment);
    setSelected(""); setStudentName(""); setNotes(""); setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Enroll in a Program">
      <Input label="Student Name *" value={studentName} onChange={setStudentName} placeholder="Enter student's full name" />

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>
          Select Program *
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            border: `1.5px solid ${C.gray300}`, fontSize: 14,
            fontFamily: "'Outfit', sans-serif", background: C.white, boxSizing: "border-box",
          }}
        >
          <option value="">Choose a program...</option>
          {["Test Prep", "FOCUS", "Elementary", "Middle School", "High School", "Special Ed"].map((cat) => (
            <optgroup key={cat} label={cat}>
              {PROGRAMS.filter((p) => p.cat === cat).map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.price}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {selected && (() => {
        const p = PROGRAMS.find((pr) => pr.id === selected);
        return p ? (
          <div style={{
            padding: "14px 18px", borderRadius: 14,
            background: `${C.green}06`, border: `1px solid ${C.green}12`, marginBottom: 16,
          }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.greenDeep }}>{p.name}</div>
            <div style={{ fontSize: 13, color: C.gray500, marginTop: 4 }}>📅 {p.schedule}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.green, marginTop: 4 }}>
              {p.price}
            </div>
          </div>
        ) : null;
      })()}

      <Input label="Notes (optional)" value={notes} onChange={setNotes} placeholder="Any special requirements..." />

      <Btn
        onClick={handleEnroll}
        variant="primary"
        style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Enrolling..." : "Confirm Enrollment"}
      </Btn>
    </Modal>
  );
}
