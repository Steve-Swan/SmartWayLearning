import React, { useState, useEffect } from 'react';
import { C } from '../utils/constants';
import DB from '../utils/db';
import { Modal } from './UI';

export default function UserDashboard({ open, onClose, user }) {
  const [tab, setTab] = useState("enrollments");
  const [enrollments, setEnrollments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (open && user) {
      setEnrollments((DB.get("sw-enrollments") || []).filter((e) => e.userEmail === user.email));
      setOrders((DB.get("sw-orders") || []).filter((o) => o.userEmail === user.email));
    }
  }, [open, user]);

  return (
    <Modal open={open} onClose={onClose} title="My Dashboard" width={600}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["enrollments", "📚 Enrollments"], ["orders", "🛒 Orders"], ["profile", "👤 Profile"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer",
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              background: tab === k ? C.green : C.gray100,
              color: tab === k ? C.white : C.gray700,
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Enrollments Tab */}
      {tab === "enrollments" && (
        <div>
          {enrollments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: C.gray500 }}>
              No enrollments yet. Explore our programs to get started!
            </div>
          ) : (
            enrollments.map((e) => (
              <div key={e.id} style={{
                padding: "18px 20px", borderRadius: 16,
                border: `1px solid ${C.greenPale}`, marginBottom: 10, background: C.white,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.greenDeep }}>{e.programName}</div>
                    <div style={{ fontSize: 13, color: C.gray500, marginTop: 2 }}>Student: {e.studentName}</div>
                    <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>
                      Enrolled: {new Date(e.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span style={{
                    padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700,
                    background: e.status === "Active" ? `${C.green}12` : `${C.coral}12`,
                    color: e.status === "Active" ? C.green : C.coral,
                  }}>
                    {e.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: C.gray500 }}>
              No orders yet. Check out the Rewards Store!
            </div>
          ) : (
            orders.map((o) => (
              <div key={o.id} style={{
                padding: "18px 20px", borderRadius: 16,
                border: `1px solid ${C.greenPale}`, marginBottom: 10,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: C.gray500, fontFamily: "'JetBrains Mono', monospace" }}>{o.id}</span>
                  <span style={{ fontSize: 12, color: C.gray500 }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                </div>
                {o.items.map((i) => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
                    <span>{i.emoji} {i.name} ×{i.qty}</span>
                    <span style={{ fontWeight: 600 }}>${i.price * i.qty}</span>
                  </div>
                ))}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  borderTop: `1px solid ${C.gray100}`, paddingTop: 10, marginTop: 10,
                }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.green }}>${o.total}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Tab */}
      {tab === "profile" && (
        <div style={{ padding: "8px 0" }}>
          {[
            ["Name", user.name],
            ["Email", user.email],
            ["Phone", user.phone || "—"],
            ["Grade", user.grade || "—"],
            ["Member Since", new Date(user.createdAt).toLocaleDateString()],
            ["Points", user.points || 0],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 0", borderBottom: `1px solid ${C.gray100}`,
            }}>
              <span style={{ fontWeight: 600, color: C.gray700, fontSize: 14 }}>{k}</span>
              <span style={{ color: C.gray900, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
