import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function CTASection() {
  const { dark } = useTheme();
  return (
    <section className="section-py" style={{ background: dark ? "#111827" : "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden text-center p-10 sm:p-16"
          style={{ background: "#0A0A0A" }}
        >
          <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: "#FF7A00", transform: "translateY(-50%)" }} />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ background: "#E91E63", transform: "translateY(50%)" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-orange-400 font-sans font-semibold text-xs tracking-[0.16em] uppercase mb-6">
              Take The First Step
            </span>
            <h2 className="font-sans font-bold text-white leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(1.9rem,4vw,3.2rem)", letterSpacing: "-0.02em" }}>
              Your Child's Journey to{" "}
              <span style={{
                background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>Bloom</span>{" "}Starts Today
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              Schedule a free consultation with our compassionate specialists. We'll listen, understand, and build a personalized plan — together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-sans font-bold text-sm rounded-2xl hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", boxShadow: "0 6px 28px rgba(255,122,0,0.38)" }}>
                Book Free Consultation <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="tel:+17744642639"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/8 text-white font-sans font-semibold text-sm rounded-2xl border border-white/12 hover:bg-white/14 hover:-translate-y-0.5 transition-all backdrop-blur-sm">
                <Phone size={15} />
                Call +1 774-464-2639
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
