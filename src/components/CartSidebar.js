import React from 'react';
import { C } from '../utils/constants';
import DB from '../utils/db';
import { Btn } from './UI';

export default function CartSidebar({ open, onClose, cart, setCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const checkout = () => {
    const orders = DB.get("sw-orders") || [];
    orders.push({
      id: `ord_${Date.now()}`,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    });
    DB.set("sw-orders", orders);
    setCart([]);
    alert("Order placed! Thank you for your purchase.");
    onClose();
  };

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "100%", maxWidth: 420, background: C.white,
          boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "24px 24px 16px", borderBottom: `1px solid ${C.greenPale}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: C.greenDeep }}>
            🛒 Your Cart
          </h3>
          <button
            onClick={onClose}
            style={{
              background: C.gray100, border: "none", width: 36, height: 36,
              borderRadius: 50, cursor: "pointer", fontSize: 16, color: C.gray500,
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: C.gray500 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <div style={{ fontWeight: 600 }}>Your cart is empty</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Browse the Rewards Store to add items!</div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0", borderBottom: `1px solid ${C.gray100}`,
                }}
              >
                <div style={{ fontSize: 32 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.gray900 }}>{item.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: C.green }}>
                    ${item.price}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={{
                      width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.gray300}`,
                      background: C.white, cursor: "pointer", fontSize: 16, fontWeight: 700, color: C.gray700,
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={{
                      width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.gray300}`,
                      background: C.white, cursor: "pointer", fontSize: 16, fontWeight: 700, color: C.gray700,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.greenPale}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 20, color: C.green }}>
                ${total}
              </span>
            </div>
            <Btn onClick={checkout} variant="primary" style={{ width: "100%", justifyContent: "center" }}>
              Checkout
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}
