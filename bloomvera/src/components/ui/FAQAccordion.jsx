import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  const { dark } = useTheme();

  return (
    <div className="space-y-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}
            style={{
              borderRadius: 12,
              border: `1px solid ${isOpen ? "rgba(255,122,0,0.3)" : dark ? "rgba(255,255,255,0.06)" : "#F3F4F6"}`,
              background: dark ? "#1F2937" : "#ffffff",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: isOpen ? "0 2px 12px rgba(255,122,0,0.08)" : "none",
            }}>
            <button onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}>
              <span style={{
                fontWeight: 600, fontSize: 14, lineHeight: 1.4,
                color: isOpen ? "#FF7A00" : dark ? "#F3F4F6" : "#0A0A0A",
                transition: "color 0.2s",
              }}>
                {item.q}
              </span>
              <span style={{
                flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isOpen ? "#FF7A00" : "rgba(255,122,0,0.08)",
                color: isOpen ? "#fff" : "#FF7A00",
                transition: "all 0.2s",
              }}>
                {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="body"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="px-5 pb-5">
                    <div style={{ height: 1, background: dark ? "rgba(255,255,255,0.06)" : "#F3F4F6", marginBottom: 16 }} />
                    <p style={{ color: dark ? "#9CA3AF" : "#6B7280", fontSize: 14, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
