import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { useTheme } from "../../context/ThemeContext";

const services = [
  {
    title: "ABA Therapy",
    sub: "Applied Behavior Analysis",
    desc: "The gold-standard, evidence-based therapy using positive reinforcement to build essential skills and foster lasting independence.",
    image: "/aba-therapy.webp",
    accent: "#FF7A00",
  },
  {
    title: "Social Skills Groups",
    sub: "Peer Interaction Programs",
    desc: "Structured group sessions where children practice communication, build friendships, and develop real-world social confidence.",
    image: "/social-skills.webp",
    accent: "#00A651",
  },
  {
    title: "Daily Living Skills",
    sub: "Independence Training",
    desc: "Step-by-step training for self-care, routines, and daily tasks — giving children the tools for greater independence.",
    image: "/daily-skills.jpeg",
    accent: "#E91E63",
  },
  {
    title: "Home-Based Support",
    sub: "In-Home Autism Care",
    desc: "Certified therapists come to your home, delivering personalized support in the child's most comfortable environment.",
    image: "/home-support.jpg",
    accent: "#FF7A00",
  },
];

function ServiceCard({ s, i, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
      className="group relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: dark ? "#1F2937" : "#ffffff",
        border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.14)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] shrink-0"
        style={{ background: dark ? "#111827" : "#F3F4F6" }}>
        <img src={s.image} alt={s.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => {
            e.target.parentElement.innerHTML = `
              <div class="w-full h-full flex items-center justify-center" style="background:linear-gradient(135deg,${s.accent}18,${s.accent}08)">
                <div class="text-center p-6">
                  <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style="background:${s.accent}18">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${s.accent}" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                  </div>
                  <p style="font-weight:600;color:#9CA3AF;font-size:13px">${s.title}</p>
                </div>
              </div>`;
          }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300"
          style={{ background: s.accent }} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-sans text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: s.accent }}>
          {s.sub}
        </p>
        <h3 className="font-sans font-bold text-lg leading-snug tracking-tight mb-3"
          style={{ color: dark ? "#F9FAFB" : "#0A0A0A" }}>
          {s.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1"
          style={{ color: dark ? "#9CA3AF" : "#6B7280" }}>
          {s.desc}
        </p>
        <Link to="/services"
          className="inline-flex items-center gap-1.5 mt-5 text-xs font-sans font-semibold transition-all group-hover:gap-2.5"
          style={{ color: s.accent }}>
          Learn more <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { dark } = useTheme();
  return (
    <section className="section-py" style={{ background: dark ? "#111827" : "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          tag="Our Programs"
          title="Specialized Services"
          highlight="For Every Child"
          subtitle="Every program is carefully designed around your child's unique needs, delivered by certified specialists who genuinely care."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} dark={dark} />)}
        </div>
      </div>
    </section>
  );
}
