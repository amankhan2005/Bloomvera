import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, CheckCircle } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { useTheme } from "../../context/ThemeContext";

export default function MissionVision() {
  const { dark } = useTheme();
  return (
    <section className="section-py" style={{ background: dark ? "#111827" : "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading tag="Who We Are" title="Mission &" highlight="Vision" />
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="relative rounded-3xl overflow-hidden text-white p-8 sm:p-10 flex flex-col"
            style={{ background: "linear-gradient(135deg,#FF7A00 0%,#E91E63 100%)" }}
          >
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white", transform: "translate(30%,-30%)" }} />
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-5 backdrop-blur-sm">
              <Target size={20} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-white/70 mb-3">Our Mission</span>
            <h3 className="font-sans font-bold text-2xl leading-tight tracking-tight mb-4">
              Empowering Autistic Children With Compassionate Support
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-8 flex-1">
              We deliver personalized, evidence-based autism care that helps every child discover their strengths, develop essential skills, and build a foundation for a fulfilling life.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[["50+","Families Served"],["4","Core Programs"]].map(([n, l]) => (
                <div key={l} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                  <p className="font-sans font-bold text-2xl text-white">{n}</p>
                  <p className="text-white/70 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="relative rounded-3xl overflow-hidden text-white p-8 sm:p-10 flex flex-col"
            style={{ background: "linear-gradient(135deg,#00A651 0%,#007D3D 100%)" }}
          >
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white", transform: "translate(30%,-30%)" }} />
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-5 backdrop-blur-sm">
              <Eye size={20} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-white/70 mb-3">Our Vision</span>
            <h3 className="font-sans font-bold text-2xl leading-tight tracking-tight mb-4">
              Helping Every Child Thrive Confidently
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-8 flex-1">
              A world where every autistic child is celebrated for who they are — supported by their community, empowered by their skills, and equipped to lead a rich, independent, joyful life.
            </p>
            <div className="space-y-2.5">
              {["Inclusive communities for all children","Family-centered therapy models","Research-backed innovation"].map(v => (
                <div key={v} className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <CheckCircle size={14} className="text-white/80 shrink-0" strokeWidth={2.5} />
                  <span className="text-white/90 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
