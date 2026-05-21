import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Users, Sparkles, Home, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/sections/CTASection";

const services = [
  {
    id: "aba", icon: Brain, title: "ABA Therapy", full: "Applied Behavior Analysis",
    tagline: "Scientifically proven. Deeply personalized.",
    image: "/aba-therapy.jpg", color: "#FF7A00",
    gradient: "linear-gradient(135deg,#FF7A00 0%,#E91E63 100%)",
    gradientSoft: "linear-gradient(135deg,rgba(255,122,0,0.08) 0%,rgba(233,30,99,0.08) 100%)",
    desc: "The gold-standard evidence-based approach for autism. Our certified BCBAs design individualized programs using positive reinforcement to build communication, social, and daily living skills.",
    benefits: ["Improves communication and language", "Builds social and emotional skills", "Reduces challenging behaviors", "Develops academic readiness", "Increases daily living independence"],
    process: [
      { step: "Assessment", desc: "Comprehensive evaluation of strengths, needs, and goals." },
      { step: "Program Design", desc: "Custom ABA plan by a Board Certified Behavior Analyst." },
      { step: "Therapy", desc: "Consistent sessions with skilled therapists." },
      { step: "Progress Review", desc: "Ongoing data tracking and program updates." },
    ],
  },
  {
    id: "social", icon: Users, title: "Social Skills", full: "Peer Interaction Programs",
    tagline: "Building connections, one friendship at a time.",
    image: "/social-skills.webp", color: "#00A651",
    gradient: "linear-gradient(135deg,#00A651 0%,#007D3D 100%)",
    gradientSoft: "linear-gradient(135deg,rgba(0,166,81,0.08) 0%,rgba(0,125,61,0.08) 100%)",
    desc: "Safe, therapist-guided group sessions where children practice conversation, emotional regulation, and real-world social scenarios that lead to genuine friendships.",
    benefits: ["Practice real social scenarios", "Develop conversational skills", "Learn emotional regulation", "Build group confidence", "Form genuine friendships"],
    process: [
      { step: "Grouping", desc: "Children matched by age and social skill level." },
      { step: "Curriculum", desc: "Structured weekly targets for social competencies." },
      { step: "Guided Practice", desc: "Role-play, games, and collaborative activities." },
      { step: "Home Extension", desc: "Parent coaching to reinforce skills at home." },
    ],
  },
  {
    id: "daily", icon: Sparkles, title: "Daily Living", full: "Independence Training",
    tagline: "Empowering children to navigate everyday life.",
    image: "/daily-skills.jpeg", color: "#E91E63",
    gradient: "linear-gradient(135deg,#E91E63 0%,#FF7A00 100%)",
    gradientSoft: "linear-gradient(135deg,rgba(233,30,99,0.08) 0%,rgba(255,122,0,0.08) 100%)",
    desc: "Step-by-step training for self-care, hygiene, meal preparation, and community navigation — building the practical skills children need for true independence.",
    benefits: ["Personal hygiene routines", "Dressing and self-care", "Meal preparation safety", "Home organization skills", "Community navigation"],
    process: [
      { step: "Skills Assessment", desc: "Identify current levels and priority areas." },
      { step: "Task Analysis", desc: "Break each skill into achievable steps." },
      { step: "Hands-On Practice", desc: "Real-world practice in home and community." },
      { step: "Fading Support", desc: "Gradually reduce prompts to build independence." },
    ],
  },
  {
    id: "home", icon: Home, title: "Home Support", full: "In-Home Autism Care",
    tagline: "Expert care in the place your child feels safest.",
    image: "/home-support.jpg", color: "#7C3AED",
    gradient: "linear-gradient(135deg,#7C3AED 0%,#FF7A00 100%)",
    gradientSoft: "linear-gradient(135deg,rgba(124,58,237,0.08) 0%,rgba(255,122,0,0.08) 100%)",
    desc: "Our therapists come to your home, addressing challenges as they naturally occur — while actively coaching your family to reinforce learning throughout every day.",
    benefits: ["Therapy in familiar surroundings", "Real-life skill generalization", "Active family coaching", "Flexible scheduling", "Immediate skill application"],
    process: [
      { step: "Home Visit", desc: "Initial assessment of environment and goals." },
      { step: "Scheduling", desc: "Flexible sessions fitting your family life." },
      { step: "In-Home Therapy", desc: "Expert therapists work directly with your child." },
      { step: "Family Coaching", desc: "Train caregivers to reinforce skills daily." },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState("aba");
  const scrollRef = useRef(null);
  const s = services.find(x => x.id === active);
  const Icon = s.icon;
  const activeIdx = services.findIndex(x => x.id === active);

  const scrollTabs = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 140, behavior: "smooth" });
    }
  };

  const handleTabClick = (id) => {
    setActive(id);
    // Auto-scroll selected tab into view
    const el = scrollRef.current?.querySelector(`[data-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <style>{`
        .tabs-scroll::-webkit-scrollbar { display: none; }
        .tabs-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .process-card {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 1.5rem 1.25rem 1.25rem;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .process-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          transition: background 0.2s;
        }
        .benefit-item:hover { background: rgba(255,255,255,0.7); }

        @media (max-width: 640px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <PageHero
        tag="Our Programs"
        title="Services Built Around"
        highlight="Your Child"
        subtitle="Every program designed around one goal — helping your child grow, thrive, and reach their full potential."
        image="/service.jpg"
      />

      {/* ── STICKY TAB BAR ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Mobile: scroll arrows + pill strip */}
          <div className="flex sm:hidden items-center gap-1 px-3 py-3">
            <button
              onClick={() => scrollTabs(-1)}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-500 active:scale-95 transition-transform"
              aria-label="Scroll left">
              <ChevronLeft size={15} strokeWidth={2.5} />
            </button>

            <div ref={scrollRef} className="tabs-scroll flex-1 flex gap-2 overflow-x-auto py-0.5">
              {services.map((sv) => {
                const SI = sv.icon;
                const isA = sv.id === active;
                return (
                  <motion.button
                    key={sv.id}
                    data-id={sv.id}
                    onClick={() => handleTabClick(sv.id)}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-semibold text-xs transition-all duration-300"
                    style={isA
                      ? { background: sv.gradient, color: "#fff", boxShadow: `0 4px 14px ${sv.color}45` }
                      : { background: "#F3F4F6", color: "#9CA3AF" }
                    }>
                    <SI size={13} strokeWidth={2.2} />
                    {sv.title}
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => scrollTabs(1)}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-500 active:scale-95 transition-transform"
              aria-label="Scroll right">
              <ChevronRight size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Desktop: centered wrap */}
          <div className="hidden sm:flex flex-wrap gap-2 justify-center px-8 py-4">
            {services.map((sv) => {
              const SI = sv.icon;
              const isA = sv.id === active;
              return (
                <motion.button
                  key={sv.id}
                  onClick={() => setActive(sv.id)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300"
                  style={isA
                    ? { background: sv.gradient, color: "#fff", boxShadow: `0 4px 18px ${sv.color}40` }
                    : { background: "#F3F4F6", color: "#6B7280" }
                  }>
                  <SI size={15} strokeWidth={2} />
                  {sv.title}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-gray-50/60" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>

              {/* ── HERO CARD ── */}
              <div className="rounded-3xl overflow-hidden mb-8 relative"
                style={{ background: s.gradient, boxShadow: `0 24px 60px ${s.color}30` }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0%, transparent 60%)" }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Icon size={32} color="#fff" strokeWidth={1.8} />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">{s.full}</p>
                    <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-tight mb-1">{s.title}</h2>
                    <p className="text-white/85 text-sm italic">{s.tagline}</p>
                  </div>
                </div>
              </div>

              {/* ── IMAGE + DESC + BENEFITS ── */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6 content-grid">

                {/* Left: image + desc + CTA */}
                <div className="flex flex-col gap-5">
                  <div className="rounded-2xl overflow-hidden bg-gray-200 relative group"
                    style={{ aspectRatio: "16/9" }}>
                    <img src={s.image} alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { e.target.parentElement.style.background = `${s.color}15`; e.target.style.display = "none"; }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(to top, ${s.color}40, transparent)` }} />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100/80"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <Link to="/contact-us"
                      className="inline-flex items-center gap-2 px-6 py-3 text-white font-sans font-bold text-sm rounded-xl hover:-translate-y-0.5 transition-all active:scale-95"
                      style={{ background: s.gradient, boxShadow: `0 6px 20px ${s.color}35` }}>
                      Book Free Consultation
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>

                {/* Right: benefits */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100/80"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: s.gradient }} />
                    <h3 className="font-bold text-gray-900 text-base tracking-tight">Key Benefits</h3>
                  </div>
                  <ul className="space-y-1">
                    {s.benefits.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="benefit-item">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${s.color}15` }}>
                          <CheckCircle2 size={13} style={{ color: s.color }} strokeWidth={2.5} />
                        </div>
                        <span className="text-gray-700 text-sm">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── PROCESS ── */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100/80"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 rounded-full" style={{ background: s.gradient }} />
                  <h3 className="font-bold text-gray-900 text-base tracking-tight">Our Process</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 process-grid">
                  {s.process.map((p, i) => (
                    <motion.div
                      key={p.step}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                      className="process-card">
                      {/* Step number watermark */}
                      <span className="absolute top-3 right-4 font-black text-6xl leading-none select-none"
                        style={{ color: s.color, opacity: 0.06 }}>{i + 1}</span>

                      {/* Accent bar */}
                      <div className="w-8 h-1 rounded-full mb-4" style={{ background: s.gradient }} />

                      {/* Step badge */}
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                        style={{ background: `${s.color}12`, color: s.color }}>
                        Step {i + 1}
                      </span>

                      <h4 className="font-bold text-gray-900 text-sm mb-1.5 leading-tight">{p.step}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>

                      {/* Connector dot (not on last) */}
                      {i < s.process.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 rounded-full border-2 border-white z-10"
                          style={{ background: s.color, transform: "translateY(-50%)" }} />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </>
  );
}