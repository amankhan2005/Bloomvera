import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function SectionHeading({ tag, title, highlight, subtitle, center = true, light = false }) {
  const { dark } = useTheme();
  const textColor = light ? "text-white" : (dark ? "text-gray-100" : "text-dark");
  const subtitleColor = light ? "text-gray-400" : (dark ? "text-gray-400" : "text-muted");

  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {tag && (
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-6 bg-orange-500" />
          <span className="text-orange-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">{tag}</span>
          <span className="h-px w-6 bg-orange-500" />
        </motion.div>
      )}
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
        className={`font-sans font-bold leading-tight tracking-tight ${textColor}`}
        style={{ fontSize: "clamp(1.9rem,3.5vw,2.75rem)", letterSpacing: "-0.02em" }}>
        {title}{" "}
        {highlight && (
          <span style={{
            background: "linear-gradient(135deg,#FF7A00 0%,#E91E63 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{highlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
          className={`mt-4 text-base leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${subtitleColor}`}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
