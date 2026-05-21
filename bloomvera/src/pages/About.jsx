import React from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen, MapPin } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import { useTheme } from "../context/ThemeContext";
import CTASection from "../components/sections/CTASection";
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedWrapper";

const values = [
  { icon: Heart,    label: "Compassion",   desc: "Every interaction guided by genuine care for the children and families we serve.", color: "#E91E63" },
  { icon: Award,    label: "Excellence",   desc: "We hold ourselves to the highest clinical standards in every program we deliver.", color: "#FF7A00" },
  { icon: Users,    label: "Collaboration",desc: "We partner with families as true teammates in each child's development journey.", color: "#00A651" },
  { icon: BookOpen, label: "Evidence",     desc: "All programs grounded in peer-reviewed research and clinical best practices.", color: "#FF7A00" },
];

export default function About() {
  const { dark } = useTheme();
  const bg1 = dark ? "#111827" : "#ffffff";
  const bg2 = dark ? "#1A2332" : "#F9FAFB";
  const heading = dark ? "#F1F5F9" : "#0A0A0A";
  const body = dark ? "#94A3B8" : "#6B7280";
  const cardBg = dark ? "#1E293B" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

  return (
    <>
      <PageHero
        tag="Who We Are"
        title="A Team That"
        highlight="Truly Cares"
        subtitle="More than therapists — we're advocates, partners, and believers in the limitless potential of every child on the autism spectrum."
        image="/about-1.jpg"
      />

      {/* Story */}
      <section className="section-py" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
              <div className="rounded-3xl overflow-hidden aspect-video shadow-card-hover"
                style={{ background: dark ? "#1E293B" : "#f3f4f6" }}>
                <img src="/hero-2.webp" alt="Our team" className="w-full h-full object-cover"
                  onError={e => e.target.style.display = "none"} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-6 bg-orange-500" />
                <span className="text-orange-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">Our Story</span>
              </div>
              <h2 className="font-sans font-bold tracking-tight mb-5"
                style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", color: heading }}>
                Built on Belief in Every Child's Potential
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: body }}>
                Bloomvera Autism was founded by a team of dedicated clinicians and family advocates who recognized a critical need — autism care that is both clinically rigorous and deeply human.
              </p>
              <p className="text-base leading-relaxed" style={{ color: body }}>
                We believe that with the right support, every autistic child can develop skills, build confidence, and thrive — in their own unique way, at their own pace.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-6 bg-green-500" />
                <span className="text-green-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">Our Approach</span>
              </div>
              <h2 className="font-sans font-bold tracking-tight mb-5"
                style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", color: heading }}>
                Where Science and Compassion Meet
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: body }}>
                We integrate evidence-based techniques with a genuine commitment to the wellbeing of each child and family. Our therapists aren't just clinicians — they are dedicated partners in your journey.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: body }}>
                Every program is tailored to the individual. No two children are the same, and neither are their care plans.
              </p>

              {/* ── Home-Based ABA callout ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22,1,0.36,1] }}
                className="flex items-start gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: dark ? "rgba(0,166,81,0.10)" : "rgba(0,166,81,0.07)",
                  border: `1px solid ${dark ? "rgba(0,166,81,0.25)" : "rgba(0,166,81,0.18)"}`,
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(0,166,81,0.15)" }}>
                  <MapPin size={18} style={{ color: "#00A651" }} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm mb-1" style={{ color: heading }}>
                    Home-Based ABA Therapy · Washington State
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: body }}>
                    We bring therapy to where children feel most comfortable — their own home. Our certified behavior analysts provide in-home ABA services across Washington, helping families build real-world skills in a familiar, low-stress environment.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden aspect-video shadow-card-hover"
                style={{ background: dark ? "#1E293B" : "#f0fbf5" }}>
                <img src="/evidence-based.jpg" alt="Our approach" className="w-full h-full object-cover"
                  onError={e => e.target.style.display = "none"} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading tag="What Guides Us" title="Our Core" highlight="Values" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.label}>
                  <motion.div whileHover={{ y: -5 }}
                    className="rounded-2xl p-6 text-center h-full flex flex-col items-center transition-all"
                    style={{
                      background: cardBg,
                      border: `1px solid ${cardBorder}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${v.color}18` }}>
                      <Icon size={22} style={{ color: v.color }} strokeWidth={2} />
                    </div>
                    <h3 className="font-sans font-bold text-sm mb-2" style={{ color: heading }}>{v.label}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: body }}>{v.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}