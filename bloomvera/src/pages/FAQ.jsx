import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import FAQAccordion from "../components/ui/FAQAccordion";
import CTASection from "../components/sections/CTASection";

const categories = [
  { label:"General", faqs:[
    { q:"What is autism spectrum disorder (ASD)?", a:"Autism spectrum disorder is a neurodevelopmental condition characterized by differences in social communication, sensory processing, and patterns of behavior. It affects individuals in many ways — every autistic person is unique, with their own strengths and challenges." },
    { q:"At what age should I seek evaluation?", a:"Signs of autism can appear as early as 12–18 months. We recommend seeking evaluation as soon as you notice developmental differences. Early intervention leads to significantly better outcomes, though therapy is effective and beneficial at any age." },
    { q:"How do I get started with Bloomvera Autism?", a:"Contact us to schedule a free initial consultation. Our team will discuss your child's needs, answer questions, and recommend the most appropriate programs — with no obligation whatsoever." },
  ]},
  { label:"Therapy", faqs:[
    { q:"What is ABA Therapy and how does it work?", a:"ABA uses positive reinforcement to build skills and reduce challenging behaviors. Therapists work one-on-one with children using structured learning and natural play to teach communication, social, and adaptive skills tailored to each child's goals." },
    { q:"How many therapy hours does my child need?", a:"Hours vary based on individual needs. After a comprehensive assessment, our clinical team will recommend an appropriate intensity — typically ranging from 10 to 40 hours per week for ABA." },
    { q:"Do you provide home-based therapy?", a:"Yes. Our Home-Based program brings certified therapists to your home, and we provide caregiver coaching to help generalize skills across all settings." },
    { q:"Are your therapists certified?", a:"Yes. Our team includes Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs), all holding valid certifications with ongoing professional development." },
  ]},
  { label:"Family", faqs:[
    { q:"How are families involved in therapy?", a:"Family involvement is central to everything we do. We provide parent training, detailed progress reports, and teach caregivers practical strategies to support development at home and in the community." },
    { q:"What support do you offer caregivers?", a:"We offer dedicated caregiver coaching including behavior strategies, communication techniques, and how to support routines and skill generalization in daily life." },
  ]},
  { label:"Fees & Access", faqs:[
    { q:"Do you accept insurance?", a:"We are working to accept a variety of insurance plans. Contact us to discuss your specific coverage and available funding options — we'll help guide you through verifying benefits." },
    { q:"Is the initial consultation really free?", a:"Yes — completely free and with no obligation. We want to listen to your family's needs and make sure we're the right fit before any commitments are made." },
  ]},
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("All");

  const allFaqs = useMemo(() => categories.flatMap(c => c.faqs), []);
  const filtered = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return allFaqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    if (cat === "All") return null;
    return categories.find(c => c.label === cat)?.faqs || [];
  }, [search, cat, allFaqs]);

  return (
    <>
      <PageHero
        tag="Help Center"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Clear, honest answers to what families ask most. Can't find yours? We're always happy to talk."
        image="/faq.png"
      />

      <section className="section-py" style={{background:"#F9FAFB"}}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">

          {/* Search */}
          <div className="relative mb-8">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2.5} />
            <input type="text" placeholder="Search questions..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-5 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-orange-300 focus:outline-none font-sans text-sm text-dark placeholder:text-gray-400 shadow-card transition-all" />
          </div>

          {/* Category tabs */}
          {!search.trim() && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {["All", ...categories.map(c => c.label)].map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className="px-4 py-2 rounded-xl text-sm font-sans font-semibold transition-all duration-200"
                  style={cat === c
                    ? { background:"linear-gradient(135deg,#FF7A00,#E91E63)", color:"#fff", boxShadow:"0 4px 16px rgba(255,122,0,0.3)" }
                    : { background:"#fff", color:"#6B7280", border:"1px solid #E5E7EB" }
                  }>
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {search.trim() ? (
            filtered.length > 0
              ? <FAQAccordion items={filtered} />
              : <p className="text-center text-muted py-12 font-sans text-sm">No results for "{search}".</p>
          ) : cat === "All" ? (
            <div className="space-y-10">
              {categories.map(c => (
                <div key={c.label}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-5 bg-orange-400" />
                    <h3 className="font-sans font-semibold text-dark text-xs uppercase tracking-widest">{c.label}</h3>
                  </div>
                  <FAQAccordion items={c.faqs} />
                </div>
              ))}
            </div>
          ) : (
            <FAQAccordion items={filtered} />
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}