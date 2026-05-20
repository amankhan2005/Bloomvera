import React from "react";
import { motion } from "framer-motion";
import { Award, ClipboardList, Baby, Heart, Users, BookOpen } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const items = [
  { icon: Award,         title: "Certified Specialists",  desc: "Board-certified BCBAs and RBTs with years of hands-on clinical expertise.", color: "#FF7A00" },
  { icon: ClipboardList, title: "Personalized Plans",     desc: "Every child gets a custom program built around their unique strengths and goals.", color: "#00A651" },
  { icon: Baby,          title: "Child-First Approach",   desc: "Sessions designed around the child — their comfort, pace, and interests.", color: "#E91E63" },
  { icon: Heart,         title: "Compassionate Team",     desc: "Every interaction guided by warmth, dignity, and genuine care for each family.", color: "#FF7A00" },
  { icon: Users,         title: "Family Partnership",     desc: "We work alongside families, providing tools and coaching to extend progress at home.", color: "#00A651" },
  { icon: BookOpen,      title: "Evidence-Based Methods", desc: "All programs grounded in peer-reviewed research and current best clinical practices.", color: "#E91E63" },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          tag="Why Choose Us"
          title="Care That Makes a"
          highlight="Real Difference"
          subtitle="We combine clinical excellence with genuine compassion — because the best outcomes happen when both are present."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex gap-4 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${item.color}14` }}>
                  <Icon size={20} style={{ color: item.color }} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-dark text-sm mb-1.5 leading-snug">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
