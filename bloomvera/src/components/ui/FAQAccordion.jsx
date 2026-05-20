import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={`rounded-xl border transition-all duration-250 overflow-hidden ${
              isOpen ? "border-orange-200 shadow-card" : "border-gray-100 hover:border-gray-200"
            } bg-white`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`font-sans font-semibold text-sm leading-snug transition-colors ${isOpen ? "text-orange-500" : "text-dark"}`}>
                {item.q}
              </span>
              <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isOpen ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-500"
              }`}>
                {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-muted text-sm leading-relaxed">{item.a}</p>
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
