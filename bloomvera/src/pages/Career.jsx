import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Upload, CheckCircle2, Loader2, Briefcase,
  Users, Heart, TrendingUp, MapPin, Clock, X
} from "lucide-react";
import toast from "react-hot-toast";
import PageHero from "../components/ui/PageHero";
import { useTheme } from "../context/ThemeContext";

const API_URL = process.env.REACT_APP_API_URL;

const openings = [
  {
    title: "BCBA – Board Certified Behavior Analyst",
    type: "Full-Time", location: "Steilacoom, WA",
    desc: "Lead clinical programs, supervise RBTs, and deliver ABA therapy plans for children with autism.",
    tags: ["Clinical", "Leadership"],
  },
  {
    title: "Registered Behaviour Technician (RBT)",
    type: "Full-Time / Part-Time", location: "Steilacoom, WA",
    desc: "Implement one-on-one ABA therapy sessions under BCBA supervision in home and centre settings.",
    tags: ["Entry-Level", "Hands-On"],
  },
];

const perks = [
  { icon: Heart,      title: "Meaningful Work",    desc: "Make a real difference in children's lives every single day." },
  { icon: TrendingUp, title: "Growth & Training",  desc: "Paid training, CEU support, and clear career pathways." },
  { icon: Users,      title: "Collaborative Team", desc: "Work alongside passionate, experienced clinicians." },
  { icon: Briefcase,  title: "Competitive Pay",    desc: "Salary + benefits commensurate with experience." },
];

const initialForm = {
  fullName: "", email: "", phone: "", position: "", resume: null, message: "",
};

function validate(form) {
  const e = {};
  if (!form.fullName.trim()) e.fullName = "Full name is required";
  if (!form.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
  if (form.phone && !/^\+?[\d\s\-()+]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
  if (!form.position.trim()) e.position = "Please select a position";
  if (!form.message.trim()) e.message = "Cover letter / message is required";
  else if (form.message.trim().length < 20) e.message = "Please write at least 20 characters";
  return e;
}

function Field({ label, error, required, children, hint }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF" }}>
          {label}{required && <span style={{ color: "#F472B6", marginLeft: 2 }}>*</span>}
        </label>
        {hint && <span style={{ fontSize: 11, color: "#9CA3AF" }}>{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{ marginTop: 6, fontSize: 12, color: "#F87171", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#F87171", display: "inline-block", flexShrink: 0 }} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Career() {
  const { dark } = useTheme();
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const onChange = e => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm(f => ({ ...f, resume: files[0] || null }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
      if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Build FormData so resume file is included
      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("email",    form.email);
      fd.append("phone",    form.phone);
      fd.append("position", form.position);
      fd.append("message",  form.message);
      if (form.resume) fd.append("resume", form.resume);

      if (!API_URL) {
        // No backend yet — simulate success
        await new Promise(r => setTimeout(r, 1600));
        setDone(true);
        toast.success("Application submitted! We'll be in touch soon.", { duration: 5000 });
        return;
      }

      const res  = await fetch(`${API_URL}/api/career`, {
        method: "POST",
        body: fd,          // multipart/form-data — no Content-Type header needed
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setDone(true);
      setForm(initialForm);
      toast.success("Application submitted! We'll be in touch soon.", { duration: 5000 });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Design tokens
  const bg1       = dark ? "#111827" : "#ffffff";
  const bg2       = dark ? "#1F2937" : "#F9FAFB";
  const cardBg    = dark ? "#1E293B" : "#ffffff";
  const cardBorder= dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const heading   = dark ? "#F1F5F9" : "#111827";
  const body      = dark ? "#94A3B8" : "#6B7280";
  const inputBg   = dark ? "#0F172A" : "#FAFAFA";
  const inputBorderColor = dark ? "#334155" : "#E5E7EB";

  const inputBase = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 12,
    border: `1.5px solid ${inputBorderColor}`,
    background: inputBg,
    color: dark ? "#F1F5F9" : "#111827",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const focusStyle = { borderColor: "#FF7A00", boxShadow: "0 0 0 3px rgba(255,122,0,0.12)" };
  const blurStyle  = { borderColor: inputBorderColor, boxShadow: "none" };

  return (
    <div style={{ background: bg1, minHeight: "100vh", transition: "background 0.3s" }}>
      <PageHero
        title="Build a Career With Purpose"
        subtitle="Join our team of compassionate professionals dedicated to empowering children with autism."
        image="/contact.jpeg"
      />

      {/* Perks */}
      <section style={{ background: bg2 }} className="section-py">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ background: "rgba(255,122,0,0.1)", color: "#FF7A00" }}>Why Join Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: heading }}>
              More than a job — a <span className="gradient-text">calling</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 16, background: "rgba(255,122,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p.icon size={22} color="#FF7A00" strokeWidth={2} />
                </div>
                <h3 style={{ color: heading, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: body, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-py" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ background: "rgba(0,166,81,0.1)", color: "#00A651" }}>Open Positions</span>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: heading }}>
              Current <span className="gradient-text">Opportunities</span>
            </h2>
          </div>
          <div className="space-y-4">
            {openings.map((j, i) => (
              <motion.div key={j.title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: bg2, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "22px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <h3 style={{ color: heading, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{j.title}</h3>
                  <p style={{ color: body, fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{j.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#FF7A00" }}>
                      <Clock size={11} strokeWidth={2.5} />{j.type}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: body }}>
                      <MapPin size={11} strokeWidth={2.5} />{j.location}
                    </span>
                    {j.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "rgba(255,122,0,0.08)", color: "#FF7A00" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <a href="#apply-form"
                  onClick={() => setForm(f => ({ ...f, position: j.title }))}
                  style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 10, textDecoration: "none", boxShadow: "0 4px 14px rgba(255,122,0,0.3)", whiteSpace: "nowrap" }}>
                  Apply Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="section-py" style={{ background: bg2 }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ background: "rgba(233,30,99,0.1)", color: "#E91E63" }}>Apply Now</span>
            <h2 className="text-3xl font-bold" style={{ color: heading }}>
              Submit Your <span className="gradient-text">Application</span>
            </h2>
            <p style={{ color: body, marginTop: 10, fontSize: 14 }}>
              Fill in the form below and we'll review your application within 3–5 business days.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: cardBg, border: "1px solid rgba(0,166,81,0.2)", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px", background: "rgba(0,166,81,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={36} color="#00A651" strokeWidth={1.8} />
                </div>
                <h3 style={{ color: heading, fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Application Received!</h3>
                <p style={{ color: body, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Thank you for your interest in joining Bloomvera. Our team will review your application and reach out within 3–5 business days at <strong style={{ color: heading }}>{form.email}</strong>.
                </p>
                <button onClick={() => { setDone(false); setForm(initialForm); }}
                  style={{ padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#FF7A00,#E91E63)", color: "#fff", fontWeight: 600, fontSize: 14 }}>
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Full Name */}
                  <Field label="Full Name" required error={errors.fullName}>
                    <input name="fullName" value={form.fullName} onChange={onChange}
                      placeholder="Jane Doe"
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, blurStyle)}
                      style={inputBase} />
                  </Field>

                  {/* Email + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Email Address" required error={errors.email}>
                      <input name="email" type="email" value={form.email} onChange={onChange}
                        placeholder="jane@example.com"
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e => Object.assign(e.target.style, blurStyle)}
                        style={inputBase} />
                    </Field>
                    <Field label="Phone Number" error={errors.phone} hint="Optional">
                      <input name="phone" type="tel" value={form.phone} onChange={onChange}
                        placeholder="+1 (555) 000-0000"
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e => Object.assign(e.target.style, blurStyle)}
                        style={inputBase} />
                    </Field>
                  </div>

                  {/* Position */}
                  <Field label="Position Applying For" required error={errors.position}>
                    <select name="position" value={form.position} onChange={onChange}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, blurStyle)}
                      style={{ ...inputBase, appearance: "none", cursor: "pointer" }}>
                      <option value="">— Select a position —</option>
                      {openings.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
                      <option value="Other / General Application">Other / General Application</option>
                    </select>
                  </Field>

                  {/* Resume Upload */}
                  <Field label="Resume / CV" hint="PDF, DOC, DOCX (optional)">
                    <label style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "11px 14px", borderRadius: 12, cursor: "pointer",
                      border: `1.5px dashed ${dark ? "#334155" : "#D1D5DB"}`,
                      background: inputBg, transition: "border-color 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#FF7A00"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "#334155" : "#D1D5DB"}>
                      <Upload size={16} color="#FF7A00" strokeWidth={2} />
                      <span style={{ fontSize: 13, color: body, flex: 1 }}>
                        {form.resume ? form.resume.name : "Click to upload your resume"}
                      </span>
                      {form.resume && (
                        <button type="button"
                          onClick={e => { e.preventDefault(); setForm(f => ({ ...f, resume: null })); }}
                          style={{ color: "#E91E63", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                          <X size={14} strokeWidth={2.5} />
                        </button>
                      )}
                      <input name="resume" type="file" accept=".pdf,.doc,.docx"
                        onChange={onChange} style={{ display: "none" }} />
                    </label>
                  </Field>

                  {/* Cover Letter */}
                  <Field label="Message / Cover Letter" required error={errors.message}>
                    <textarea name="message" value={form.message} onChange={onChange}
                      placeholder="Tell us about yourself, your experience, and why you'd like to join Bloomvera…"
                      rows={5}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, blurStyle)}
                      style={{ ...inputBase, resize: "vertical", lineHeight: 1.6 }} />
                  </Field>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    style={{
                      width: "100%", padding: "14px", borderRadius: 14, border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      background: loading ? (dark ? "#374151" : "#E5E7EB") : "linear-gradient(135deg,#FF7A00,#E91E63)",
                      color: loading ? (dark ? "#9CA3AF" : "#6B7280") : "#fff",
                      fontWeight: 700, fontSize: 15, fontFamily: "inherit",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      boxShadow: loading ? "none" : "0 6px 20px rgba(255,122,0,0.35)",
                      transition: "all 0.2s",
                    }}>
                    {loading
                      ? <><Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />Submitting…</>
                      : <><Send size={16} />Submit Application</>}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 12, color: body }}>
                    By submitting you agree to be contacted at the details provided. Questions?{" "}
                    <a href="mailto:info@bloomveraautism.com" style={{ color: "#FF7A00" }}>info@bloomveraautism.com</a>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}