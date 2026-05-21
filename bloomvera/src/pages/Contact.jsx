import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Phone, Mail, MapPin, CheckCircle2,
  Loader2, Clock, Sparkles, ArrowRight, Shield
} from "lucide-react";
import toast from "react-hot-toast";
import PageHero from "../components/ui/PageHero";
import { useTheme } from "../context/ThemeContext";

const API_URL = process.env.REACT_APP_API_URL;

const contactInfo = [
  { icon: Phone,  label: "Phone",   value: "+1 774-464-2639",                      href: "tel:+17744642639",                                                   color: "#FF7A00", newTab: false },
  { icon: Mail,   label: "Email",   value: "info@bloomveraautism.com",             href: "mailto:info@bloomveraautism.com",                                    color: "#00A651", newTab: false },
  { icon: MapPin, label: "Address", value: "2823 Marietta St\nSteilacoom, WA 98388", href: "https://maps.google.com/?q=2823+Marietta+St,+Steilacoom,+WA+98388", color: "#E91E63", newTab: true },
];

const hours = [
  ["Monday – Friday", "9:00 AM – 6:00 PM", false],
  ["Saturday",        "10:00 AM – 2:00 PM", false],
  ["Sunday",          "Closed",              true],
];

const initialForm = { name: "", email: "", phone: "", message: "" };

function validate(form) {
  const e = {};
  if (!form.name.trim())    e.name    = "Name is required";
  if (!form.email.trim())   e.email   = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
  if (form.phone && !/^\+?[\d\s\-()]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
  if (!form.message.trim()) e.message = "Message is required";
  else if (form.message.trim().length < 10) e.message = "At least 10 characters required";
  return e;
}

export default function Contact() {
  const { dark } = useTheme();
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [focused, setFocused] = useState("");

  // Design tokens
  const bg       = dark ? "#111827" : "#F9FAFB";
  const cardBg   = dark ? "#1E293B" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const heading  = dark ? "#F1F5F9" : "#111827";
  const body     = dark ? "#94A3B8" : "#6B7280";
  const inputBg  = dark ? "#0F172A" : "#ffffff";
  const inputBorder = (field) => {
    if (errors[field]) return "#F87171";
    if (focused === field) return "#FF7A00";
    return dark ? "#334155" : "#E5E7EB";
  };
  const inputShadow = (field) => {
    if (errors[field]) return "0 0 0 3px rgba(248,113,113,0.15)";
    if (focused === field) return "0 0 0 3px rgba(255,122,0,0.12)";
    return "none";
  };
  const inputText  = dark ? "#E2E8F0" : "#111827";
  const divider    = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const trustText  = dark ? "#64748B" : "#9CA3AF";
  const trustDiv   = dark ? "#334155" : "#E5E7EB";

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!API_URL) { toast.error("API URL not configured."); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setDone(true);
      setForm(initialForm);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: `1.5px solid ${inputBorder(field)}`,
    background: inputBg,
    color: inputText,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: inputShadow(field),
  });

  const FieldLabel = ({ label, required, hint, error, children }) => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "#64748B" : "#6B7280" }}>
          {label}{required && <span style={{ color: "#F472B6", marginLeft: 2 }}>*</span>}
        </label>
        {hint && <span style={{ fontSize: 11, color: dark ? "#64748B" : "#9CA3AF" }}>{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{ marginTop: 6, fontSize: 12, color: "#F87171", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#F87171", flexShrink: 0, display: "inline-block" }} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <PageHero
        tag="Get In Touch"
        title="Let's Start Your Child's"
        highlight="Journey"
        subtitle="Your first consultation is completely free. Reach out and we'll respond within one business day."
        image="/contact.jpeg"
      />

      <section style={{ background: bg, paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* LEFT PANEL */}
            <div className="lg:col-span-2 space-y-5">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 style={{ color: heading, fontWeight: 800, fontSize: "clamp(1.4rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  We'd Love to Hear From You
                </h2>
                <p style={{ color: body, fontSize: 14, lineHeight: 1.7 }}>
                  Whether you have questions, want to schedule an evaluation, or simply need to talk with someone who understands — we're here.
                </p>
              </motion.div>

              {/* Info cards */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <motion.a key={info.label} href={info.href}
                      target={info.newTab ? "_blank" : undefined}
                      rel={info.newTab ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 14,
                        padding: 16, borderRadius: 16, textDecoration: "none",
                        background: dark
                          ? `rgba(${info.color === "#FF7A00" ? "255,122,0" : info.color === "#00A651" ? "0,166,81" : "233,30,99"},0.06)`
                          : `rgba(${info.color === "#FF7A00" ? "255,122,0" : info.color === "#00A651" ? "0,166,81" : "233,30,99"},0.06)`,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                        background: dark ? "rgba(255,255,255,0.08)" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 4px 12px ${info.color}25`,
                      }}>
                        <Icon size={16} style={{ color: info.color }} strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: info.color, marginBottom: 3 }}>{info.label}</p>
                        <p style={{ fontSize: 13, color: dark ? "#CBD5E1" : "#374151", whiteSpace: "pre-line", lineHeight: 1.5 }}>{info.value}</p>
                      </div>
                      <ArrowRight size={14} style={{ color: info.color, opacity: 0.5, flexShrink: 0, marginTop: 4 }} />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Hours card — always dark */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{
                  borderRadius: 16, padding: 20, position: "relative", overflow: "hidden",
                  background: "linear-gradient(135deg,#0f172a,#1e293b)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}>
                <div style={{
                  position: "absolute", top: 0, right: 0, width: 128, height: 128, borderRadius: "50%", pointerEvents: "none",
                  background: "radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)", transform: "translate(30%,-30%)",
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(255,122,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={12} color="#FB923C" strokeWidth={2.5} />
                  </div>
                  <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Office Hours</h3>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  {hours.map(([day, time, closed], i) => (
                    <div key={day} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "10px 0", fontSize: 13,
                      borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}>
                      <span style={{ color: "#94A3B8" }}>{day}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                        background: closed ? "rgba(255,255,255,0.05)" : "rgba(255,122,0,0.15)",
                        color: closed ? "#64748B" : "#FB923C",
                      }}>{time}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                  {[["Shield", "Privacy protected"], ["CheckCircle2", "Free consult"]].map(([_, label]) => (
                    <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                      <CheckCircle2 size={10} /> {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT PANEL: Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-3">
              <div style={{
                background: cardBg, borderRadius: 24,
                border: `1px solid ${cardBorder}`,
                boxShadow: dark ? "0 4px 32px rgba(0,0,0,0.3)" : "0 4px 32px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}>
                {/* Form header */}
                <div style={{
                  padding: "24px 28px",
                  background: dark
                    ? "linear-gradient(135deg,rgba(255,122,0,0.08),rgba(233,30,99,0.06))"
                    : "linear-gradient(135deg,rgba(255,122,0,0.06),rgba(233,30,99,0.05))",
                  borderBottom: `1px solid ${divider}`,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, right: 0, width: 160, height: 160, pointerEvents: "none",
                    background: "radial-gradient(circle, rgba(255,122,0,0.1) 0%, transparent 70%)", transform: "translate(30%,-30%)",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(255,122,0,0.35)",
                    }}>
                      <Sparkles size={16} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 style={{ color: heading, fontWeight: 700, fontSize: 15 }}>Send Us a Message</h3>
                      <p style={{ color: body, fontSize: 12, marginTop: 2 }}>We reply within one business day</p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "28px" }}>
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "48px 0" }}>
                        <div style={{
                          width: 64, height: 64, borderRadius: 16, margin: "0 auto 20px",
                          background: "rgba(0,166,81,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <CheckCircle2 size={30} color="#00A651" strokeWidth={1.8} />
                        </div>
                        <h3 style={{ color: heading, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                        <p style={{ color: body, fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 280, margin: "0 auto 24px" }}>
                          Thank you for reaching out. Our team will be in touch within one business day.
                        </p>
                        <button onClick={() => setDone(false)} style={{
                          padding: "10px 22px", borderRadius: 12, border: "none", cursor: "pointer",
                          background: "linear-gradient(135deg,#FF7A00,#E91E63)", color: "#fff",
                          fontWeight: 600, fontSize: 14, fontFamily: "inherit",
                          display: "inline-flex", alignItems: "center", gap: 8,
                        }}>
                          <Send size={13} strokeWidth={2.5} /> Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={onSubmit} noValidate
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                        <FieldLabel label="Full Name" required error={errors.name}>
                          <input type="text" name="name" value={form.name} onChange={onChange}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                            placeholder="Your full name" style={inputStyle("name")} />
                        </FieldLabel>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <FieldLabel label="Email" required error={errors.email}>
                            <input type="email" name="email" value={form.email} onChange={onChange}
                              onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                              placeholder="you@example.com" style={inputStyle("email")} />
                          </FieldLabel>
                          <FieldLabel label="Phone" hint="Optional" error={errors.phone}>
                            <input type="tel" name="phone" value={form.phone} onChange={onChange}
                              onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                              placeholder="+1 774-464-2639" style={inputStyle("phone")} />
                          </FieldLabel>
                        </div>

                        <FieldLabel label="Message" required error={errors.message}>
                          <textarea name="message" value={form.message} onChange={onChange} rows={5}
                            onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                            placeholder="Tell us about your child and how we can help…"
                            style={{ ...inputStyle("message"), resize: "none", lineHeight: 1.6 }} />
                          <div style={{ textAlign: "right", marginTop: 4 }}>
                            <span style={{ fontSize: 11, color: trustText }}>{form.message.length} chars</span>
                          </div>
                        </FieldLabel>

                        <button type="submit" disabled={loading} style={{
                          width: "100%", padding: "14px",
                          borderRadius: 12, border: "none",
                          cursor: loading ? "not-allowed" : "pointer",
                          background: loading ? (dark ? "#334155" : "#E5E7EB") : "linear-gradient(135deg,#FF7A00,#E91E63)",
                          color: loading ? (dark ? "#64748B" : "#9CA3AF") : "#fff",
                          fontWeight: 700, fontSize: 15, fontFamily: "inherit",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          boxShadow: loading ? "none" : "0 6px 24px rgba(255,122,0,0.3)",
                          transition: "all 0.2s",
                        }}>
                          {loading
                            ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
                            : <><Send size={14} strokeWidth={2.5} /> Send Message</>}
                        </button>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                          {[["Privacy protected"], ["No spam, ever"], ["Replies in 1 day"]].map(([label], i) => (
                            <React.Fragment key={label}>
                              {i > 0 && <span style={{ width: 1, height: 12, background: trustDiv }} />}
                              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: trustText }}>
                                <CheckCircle2 size={10} />{label}
                              </span>
                            </React.Fragment>
                          ))}
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
