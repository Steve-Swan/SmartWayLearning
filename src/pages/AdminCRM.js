import React, { useState, useEffect } from 'react';
import { C } from '../utils/constants';
import DB from '../utils/db';
import { Btn, Modal } from '../components/UI';
import Logo from '../components/Logo';

export default function AdminCRM({ onLogout }) {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const loadData = () => {
    setUsers(DB.get("sw-users") || []);
    setEnrollments(DB.get("sw-enrollments") || []);
    setOrders(DB.get("sw-orders") || []);
  };

  useEffect(() => { loadData(); }, []);

  const toggleEnrollmentStatus = (id) => {
    const updated = enrollments.map((e) =>
      e.id === id ? { ...e, status: e.status === "Active" ? "Paused" : "Active" } : e
    );
    setEnrollments(updated);
    DB.set("sw-enrollments", updated);
  };

  const deleteUser = (email) => {
    if (!window.confirm("Delete this user and all their data?")) return;
    const u = users.filter((u) => u.email !== email);
    const e = enrollments.filter((e) => e.userEmail !== email);
    const o = orders.filter((o) => o.userEmail !== email);
    setUsers(u); setEnrollments(e); setOrders(o);
    DB.set("sw-users", u); DB.set("sw-enrollments", e); DB.set("sw-orders", o);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    users: users.length,
    enrollments: enrollments.filter((e) => e.status === "Active").length,
    orders: orders.length,
    revenue: orders.reduce((s, o) => s + o.total, 0),
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: C.gray100 }}>
      {/* Header */}
      <div style={{
        background: C.navy, padding: "16px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Logo dark size={0.85} />
          <span style={{
            background: `${C.gold}20`, color: C.gold,
            padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700,
          }}>
            ADMIN CRM
          </span>
        </div>
        <Btn onClick={onLogout} variant="outline" style={{ padding: "8px 20px", fontSize: 13, color: C.white, borderColor: "rgba(255,255,255,.2)" }}>
          ← Back to Site
        </Btn>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Users", val: stats.users, icon: "👥", color: C.green },
            { label: "Active Enrollments", val: stats.enrollments, icon: "📚", color: C.purple },
            { label: "Total Orders", val: stats.orders, icon: "🛒", color: C.gold },
            { label: "Store Revenue", val: `$${stats.revenue}`, icon: "💰", color: C.coral },
          ].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 20, padding: "24px", border: `1px solid ${C.greenPale}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: C.gray900 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: C.gray500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[["users", "👥 Users"], ["enrollments", "📚 Enrollments"], ["orders", "🛒 Orders"]].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
                background: tab === k ? C.greenDeep : C.white,
                color: tab === k ? C.white : C.gray700,
                boxShadow: tab === k ? `0 4px 16px ${C.green}22` : "none",
              }}
            >
              {l}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <Btn onClick={loadData} variant="outline" style={{ padding: "8px 18px", fontSize: 13 }}>🔄 Refresh</Btn>
        </div>

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}` }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.gray100}` }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                style={{
                  width: "100%", padding: "10px 16px", borderRadius: 12,
                  border: `1.5px solid ${C.gray300}`, fontSize: 14,
                  fontFamily: "'Outfit', sans-serif", boxSizing: "border-box", outline: "none",
                }}
              />
            </div>
            {filteredUsers.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: C.gray500 }}>
                No users found. Users will appear here when they sign up.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: C.gray100 }}>
                      {["Name", "Email", "Phone", "Grade", "Joined", "Enrollments", "Orders", "Actions"].map((h) => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left", fontWeight: 600,
                          color: C.gray700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const ue = enrollments.filter((e) => e.userEmail === u.email);
                      const uo = orders.filter((o) => o.userEmail === u.email);
                      return (
                        <tr
                          key={u.id}
                          style={{ borderBottom: `1px solid ${C.gray100}`, cursor: "pointer" }}
                          onClick={() => setSelectedUser(u)}
                          onMouseEnter={(e) => (e.currentTarget.style.background = C.greenMist)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.name}</td>
                          <td style={{ padding: "14px 16px", color: C.gray500 }}>{u.email}</td>
                          <td style={{ padding: "14px 16px", color: C.gray500 }}>{u.phone || "—"}</td>
                          <td style={{ padding: "14px 16px" }}>{u.grade || "—"}</td>
                          <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray500 }}>
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 12, fontWeight: 700, background: `${C.green}12`, color: C.green }}>
                              {ue.length}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 12, fontWeight: 700, background: `${C.gold}12`, color: C.goldDark }}>
                              {uo.length}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <button
                              onClick={(ev) => { ev.stopPropagation(); deleteUser(u.email); }}
                              style={{
                                background: `${C.coral}10`, border: "none", color: C.coral,
                                padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                                fontWeight: 600, fontSize: 12, fontFamily: "'Outfit', sans-serif",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── ENROLLMENTS TAB ── */}
        {tab === "enrollments" && (
          <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}` }}>
            {enrollments.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: C.gray500 }}>No enrollments yet.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: C.gray100 }}>
                      {["Student", "Parent/User", "Program", "Category", "Price", "Date", "Status", "Actions"].map((h) => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left", fontWeight: 600,
                          color: C.gray700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((e) => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${C.gray100}` }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>{e.studentName}</td>
                        <td style={{ padding: "14px 16px", color: C.gray500 }}>
                          {e.userName}<br /><span style={{ fontSize: 11 }}>{e.userEmail}</span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>{e.programName}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, background: `${C.purple}10`, color: C.purple }}>
                            {e.programCat}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                          {e.programPrice}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray500 }}>
                          {new Date(e.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700,
                            background: e.status === "Active" ? `${C.green}12` : `${C.coral}12`,
                            color: e.status === "Active" ? C.green : C.coral,
                          }}>
                            {e.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <button
                            onClick={() => toggleEnrollmentStatus(e.id)}
                            style={{
                              background: `${C.green}10`, border: "none", color: C.green,
                              padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                              fontWeight: 600, fontSize: 12, fontFamily: "'Outfit', sans-serif",
                            }}
                          >
                            {e.status === "Active" ? "Pause" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {tab === "orders" && (
          <div style={{ background: C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.greenPale}` }}>
            {orders.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: C.gray500 }}>No orders yet.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: C.gray100 }}>
                      {["Order ID", "Customer", "Items", "Total", "Date", "Status"].map((h) => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left", fontWeight: 600,
                          color: C.gray700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: `1px solid ${C.gray100}` }}>
                        <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{o.id}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {o.userName}<br /><span style={{ fontSize: 11, color: C.gray500 }}>{o.userEmail}</span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          {o.items.map((i) => `${i.emoji} ${i.name} ×${i.qty}`).join(", ")}
                        </td>
                        <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.green }}>
                          ${o.total}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray500 }}>
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700, background: `${C.green}12`, color: C.green }}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── User Detail Modal ── */}
        {selectedUser && (
          <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title={`User: ${selectedUser.name}`} width={550}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                ["Email", selectedUser.email],
                ["Phone", selectedUser.phone || "—"],
                ["Grade", selectedUser.grade || "—"],
                ["Joined", new Date(selectedUser.createdAt).toLocaleDateString()],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: "14px 16px", borderRadius: 14, background: C.gray100 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.gray500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                  <div style={{ fontWeight: 600, color: C.gray900, marginTop: 4, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: C.greenDeep }}>Enrollments</h4>
            {enrollments.filter((e) => e.userEmail === selectedUser.email).map((e) => (
              <div key={e.id} style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.greenPale}`, marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{e.programName}</div>
                <div style={{ fontSize: 12, color: C.gray500 }}>
                  Student: {e.studentName} · {new Date(e.createdAt).toLocaleDateString()} ·{" "}
                  <span style={{ color: e.status === "Active" ? C.green : C.coral, fontWeight: 700 }}>{e.status}</span>
                </div>
              </div>
            ))}
            {enrollments.filter((e) => e.userEmail === selectedUser.email).length === 0 && (
              <div style={{ color: C.gray500, fontSize: 13, marginBottom: 12 }}>No enrollments</div>
            )}

            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, marginTop: 20, color: C.greenDeep }}>Orders</h4>
            {orders.filter((o) => o.userEmail === selectedUser.email).map((o) => (
              <div key={o.id} style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.greenPale}`, marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: C.gray500, fontFamily: "'JetBrains Mono', monospace" }}>
                  {o.id} · {new Date(o.createdAt).toLocaleDateString()}
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  {o.items.map((i) => `${i.emoji}×${i.qty}`).join(" ")} ·{" "}
                  <span style={{ fontWeight: 700, color: C.green }}>${o.total}</span>
                </div>
              </div>
            ))}
            {orders.filter((o) => o.userEmail === selectedUser.email).length === 0 && (
              <div style={{ color: C.gray500, fontSize: 13 }}>No orders</div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
