import React, { useState, useMemo, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import FAQAccordion from "../components/ui/FAQAccordion";
import CTASection from "../components/sections/CTASection";

const categories = [
  { label: "General", emoji: "✦", faqs: [
    { q: "What is autism spectrum disorder (ASD)?", a: "Autism spectrum disorder is a neurodevelopmental condition characterized by differences in social communication, sensory processing, and patterns of behavior. It affects individuals in many ways — every autistic person is unique, with their own strengths and challenges." },
    { q: "At what age should I seek evaluation?", a: "Signs of autism can appear as early as 12–18 months. We recommend seeking evaluation as soon as you notice developmental differences. Early intervention leads to significantly better outcomes, though therapy is effective and beneficial at any age." },
    { q: "How do I get started with Bloomvera Autism?", a: "Contact us to schedule a free initial consultation. Our team will discuss your child's needs, answer questions, and recommend the most appropriate programs — with no obligation whatsoever." },
  ]},
  { label: "Therapy", emoji: "◈", faqs: [
    { q: "What is ABA Therapy and how does it work?", a: "ABA uses positive reinforcement to build skills and reduce challenging behaviors. Therapists work one-on-one with children using structured learning and natural play to teach communication, social, and adaptive skills tailored to each child's goals." },
    { q: "How many therapy hours does my child need?", a: "Hours vary based on individual needs. After a comprehensive assessment, our clinical team will recommend an appropriate intensity — typically ranging from 10 to 40 hours per week for ABA." },
    { q: "Do you provide home-based therapy?", a: "Yes. Our Home-Based program brings certified therapists to your home, and we provide caregiver coaching to help generalize skills across all settings." },
    { q: "Are your therapists certified?", a: "Yes. Our team includes Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs), all holding valid certifications with ongoing professional development." },
  ]},
  { label: "Family", emoji: "❋", faqs: [
    { q: "How are families involved in therapy?", a: "Family involvement is central to everything we do. We provide parent training, detailed progress reports, and teach caregivers practical strategies to support development at home and in the community." },
    { q: "What support do you offer caregivers?", a: "We offer dedicated caregiver coaching including behavior strategies, communication techniques, and how to support routines and skill generalization in daily life." },
  ]},
  { label: "Fees & Access", emoji: "◇", faqs: [
    { q: "Do you accept insurance?", a: "We are working to accept a variety of insurance plans. Contact us to discuss your specific coverage and available funding options — we'll help guide you through verifying benefits." },
    { q: "Is the initial consultation really free?", a: "Yes — completely free and with no obligation. We want to listen to your family's needs and make sure we're the right fit before any commitments are made." },
  ]},
];

const ALL = "All";
const tabList = [ALL, ...categories.map(c => c.label)];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(ALL);
  const scrollRef = useRef(null);

  const allFaqs = useMemo(() => categories.flatMap(c => c.faqs), []);
  const filtered = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return allFaqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    if (cat === ALL) return null;
    return categories.find(c => c.label === cat)?.faqs || [];
  }, [search, cat, allFaqs]);

  const handleTabClick = (label) => {
    setCat(label);
    const el = scrollRef.current?.querySelector(`[data-tab="${label}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const scrollTabs = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 130, behavior: "smooth" });
  };

  const totalFaqs = cat === ALL ? allFaqs.length : (categories.find(c => c.label === cat)?.faqs.length || 0);

  return (
    <>
      <style>{`
        .faq-tabs-scroll::-webkit-scrollbar { display: none; }
        .faq-tabs-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .search-wrap { position: relative; }
        .search-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          background: linear-gradient(135deg, #FF7A00, #E91E63);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 0;
        }
        .search-wrap:focus-within::before { opacity: 1; }
        .search-inner {
          position: relative;
          z-index: 1;
          border-radius: 17px;
          overflow: hidden;
        }

        .category-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .no-results-card {
          text-align: center;
          padding: 3rem 2rem;
          background: white;
          border-radius: 20px;
          border: 1px solid #F3F4F6;
        }
      `}</style>

      <PageHero
        tag="Help Center"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Clear, honest answers to what families ask most. Can't find yours? We're always happy to talk."
        image="/faq.png"
      />

      <section style={{ background: "linear-gradient(180deg,#F9FAFB 0%,#fff 100%)", paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">

          {/* ── SEARCH ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="search-wrap mb-6">
            <div className="search-inner">
              <div className="relative bg-white border border-gray-200 rounded-2xl transition-all"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Search questions…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCat(ALL); }}
                  className="w-full pl-10 pr-12 py-4 bg-transparent font-sans text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none rounded-2xl"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors text-xs font-bold">
                    ×
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── CATEGORY TABS ── */}
          <AnimatePresence>
            {!search.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="mb-10">

                {/* Mobile: scroll strip with arrows */}
                <div className="flex sm:hidden items-center gap-1.5 mb-1">
                  <button
                    onClick={() => scrollTabs(-1)}
                    className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 active:scale-95 transition-transform"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
                    aria-label="Scroll left">
                    <ChevronLeft size={14} strokeWidth={2.5} />
                  </button>

                  <div ref={scrollRef} className="faq-tabs-scroll flex-1 flex gap-2 overflow-x-auto py-1">
                    {tabList.map(label => {
                      const isA = cat === label;
                      const catObj = categories.find(c => c.label === label);
                      return (
                        <motion.button
                          key={label}
                          data-tab={label}
                          onClick={() => handleTabClick(label)}
                          whileTap={{ scale: 0.95 }}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-semibold text-xs transition-all duration-250"
                          style={isA
                            ? { background: "linear-gradient(135deg,#FF7A00,#E91E63)", color: "#fff", boxShadow: "0 4px 14px rgba(255,122,0,0.35)" }
                            : { background: "#F3F4F6", color: "#9CA3AF" }
                          }>
                          {catObj && <span style={{ fontSize: 10 }}>{catObj.emoji}</span>}
                          {label}
                        </motion.button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => scrollTabs(1)}
                    className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 active:scale-95 transition-transform"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
                    aria-label="Scroll right">
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Desktop: centered wrap */}
                <div className="hidden sm:flex flex-wrap gap-2 justify-center">
                  {tabList.map(label => {
                    const isA = cat === label;
                    const catObj = categories.find(c => c.label === label);
                    return (
                      <motion.button
                        key={label}
                        onClick={() => setCat(label)}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-200"
                        style={isA
                          ? { background: "linear-gradient(135deg,#FF7A00,#E91E63)", color: "#fff", boxShadow: "0 4px 16px rgba(255,122,0,0.3)" }
                          : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
                        }>
                        {catObj && <span style={{ fontSize: 12 }}>{catObj.emoji}</span>}
                        {label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Count badge */}
                {cat !== ALL && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-gray-400 font-sans mt-3">
                    {totalFaqs} question{totalFaqs !== 1 ? "s" : ""} in this category
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── RESULTS ── */}
          <AnimatePresence mode="wait">
            {search.trim() ? (
              <motion.div key="search-results"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                {filtered.length > 0 ? (
                  <>
                    <p className="text-xs text-gray-400 font-sans mb-4 text-center">
                      {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<span className="text-orange-500 font-semibold">{search}</span>"
                    </p>
                    <FAQAccordion items={filtered} />
                  </>
                ) : (
                  <div className="no-results-card">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                      <Search size={22} className="text-orange-400" strokeWidth={2} />
                    </div>
                    <p className="font-sans font-semibold text-gray-800 text-base mb-1">No results found</p>
                    <p className="text-gray-400 text-sm mb-5">Nothing matched "<span className="text-orange-500">{search}</span>". Try different keywords.</p>
                    <Link to="/contact-us"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-sans font-semibold text-sm"
                      style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", boxShadow: "0 4px 16px rgba(255,122,0,0.3)" }}>
                      <MessageCircle size={14} strokeWidth={2.5} />
                      Ask us directly
                    </Link>
                  </div>
                )}
              </motion.div>

            ) : cat === ALL ? (
              <motion.div key="all"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10">
                {categories.map((c, ci) => (
                  <motion.div key={c.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.07 }}>
                    <div className="category-section-label">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <span style={{ fontSize: 11, color: "#FF7A00" }}>{c.emoji}</span>
                        <span className="font-sans font-bold text-gray-500 text-xs uppercase tracking-widest">{c.label}</span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
                    </div>
                    <FAQAccordion items={c.faqs} />
                  </motion.div>
                ))}
              </motion.div>

            ) : (
              <motion.div key={cat}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <FAQAccordion items={filtered} />
              </motion.div>
            )}
          </AnimatePresence>

        

        </div>
      </section>

      <CTASection />
    </>
  );
}