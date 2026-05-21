import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Phone, Mail, MapPin, CheckCircle2,
  Loader2, Clock, Sparkles, ArrowRight, Shield
} from "lucide-react";
import toast from "react-hot-toast";
import PageHero from "../components/ui/PageHero";

const API_URL = process.env.REACT_APP_API_URL;

const contactInfo = [
  { icon: Phone,  label: "Phone",   value: "+1 774-464-2639",               href: "tel:+17744642639",                                                  color: "#FF7A00", bg: "rgba(255,122,0,0.08)",  newTab: false },
  { icon: Mail,   label: "Email",   value: "support@bloomveraautism.com",    href: "mailto:support@bloomveraautism.com",                                 color: "#00A651", bg: "rgba(0,166,81,0.08)",   newTab: false },
  { icon: MapPin, label: "Address", value: "2823 Marietta St\nSteilacoom, WA 98388", href: "https://maps.google.com/?q=2823+Marietta+St,+Steilacoom,+WA+98388", color: "#E91E63", bg: "rgba(233,30,99,0.08)", newTab: true },
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

// Floating label field component
function Field({ label, error, required, children, hint }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-sans font-semibold text-xs text-gray-500 uppercase tracking-wider">
          {label}{required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-gray-400 font-sans">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1.5 text-xs text-pink-500 font-sans flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-pink-400 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const [focused, setFocused] = useState("");

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

  const inputBase = (field) =>
    `w-full px-4 py-3.5 rounded-xl border font-sans text-sm bg-white transition-all duration-200 focus:outline-none text-gray-900 placeholder:text-gray-300 ${
      errors[field]
        ? "border-pink-300 bg-pink-50/30 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        : focused === field
        ? "border-orange-400 ring-2 ring-orange-100"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <>
      <style>{`
        .contact-card {
          background: white;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 32px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 13px;
        }
        .hours-row + .hours-row {
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          font-family: var(--font-sans, sans-serif);
        }
      `}</style>

      <PageHero
        tag="Get In Touch"
        title="Let's Start Your Child's"
        highlight="Journey"
        subtitle="Your first consultation is completely free. Reach out and we'll respond within one business day."
        image="/contact.jpeg"
      />

      <section style={{ background: "linear-gradient(180deg,#F9FAFB 0%,#fff 60%)", paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── LEFT PANEL (2/5) ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <h2 className="font-sans font-bold text-gray-900 text-2xl tracking-tight mb-2"
                  style={{ letterSpacing: "-0.02em" }}>
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Whether you have questions, want to schedule an evaluation, or simply need to talk with someone who understands — we're here.
                </p>
              </motion.div>

              {/* Contact info cards */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.newTab ? "_blank" : undefined}
                      rel={info.newTab ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                      className="info-card"
                      style={{ background: info.bg }}>
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0"
                        style={{ boxShadow: `0 4px 12px ${info.color}25` }}>
                        <Icon size={16} style={{ color: info.color }} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans font-bold text-xs uppercase tracking-widest mb-0.5"
                          style={{ color: info.color }}>{info.label}</p>
                        <p className="font-sans text-gray-800 text-sm whitespace-pre-line leading-snug">{info.value}</p>
                      </div>
                      <ArrowRight size={14} className="ml-auto shrink-0 mt-1" style={{ color: info.color, opacity: 0.5 }} />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Office hours — premium dark card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />

                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Clock size={12} className="text-orange-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-sans font-semibold text-white text-sm">Office Hours</h3>
                </div>

                <div className="relative z-10">
                  {hours.map(([day, time, closed]) => (
                    <div key={day} className="hours-row">
                      <span className="text-gray-400 font-sans">{day}</span>
                      <span className={`font-sans font-semibold text-xs px-2.5 py-1 rounded-full ${
                        closed
                          ? "bg-gray-800 text-gray-500"
                          : "bg-orange-500/15 text-orange-400"
                      }`}>{time}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/8 flex items-center gap-4 relative z-10">
                  <span className="trust-badge"><Shield size={10} /> Privacy protected</span>
                  <span className="trust-badge"><CheckCircle2 size={10} /> Free consult</span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT PANEL: Form (3/5) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3">

              <div className="contact-card">
                {/* Form header gradient strip */}
                <div className="px-7 pt-7 pb-6 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,rgba(255,122,0,0.06),rgba(233,30,99,0.05))", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", boxShadow: "0 4px 14px rgba(255,122,0,0.35)" }}>
                      <Sparkles size={16} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-gray-900 text-base tracking-tight">Send Us a Message</h3>
                      <p className="font-sans text-gray-400 text-xs mt-0.5">We reply within one business day</p>
                    </div>
                  </div>
                </div>

                <div className="px-7 py-7">
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                          className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,rgba(0,166,81,0.1),rgba(0,166,81,0.15))" }}>
                          <CheckCircle2 size={30} className="text-green-500" strokeWidth={1.8} />
                        </motion.div>
                        <h3 className="font-sans font-bold text-gray-900 text-xl mb-2 tracking-tight">Message Sent!</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                          Thank you for reaching out. Our team will be in touch within one business day.
                        </p>
                        <button
                          onClick={() => setDone(false)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", boxShadow: "0 4px 16px rgba(255,122,0,0.3)" }}>
                          <Send size={13} strokeWidth={2.5} />
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={onSubmit}
                        noValidate
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-5">

                        {/* Name */}
                        <Field label="Full Name" error={errors.name} required>
                          <input
                            type="text" name="name" value={form.name}
                            onChange={onChange}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused("")}
                            placeholder="Your full name"
                            className={inputBase("name")}
                          />
                        </Field>

                        {/* Email + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Email" error={errors.email} required>
                            <input
                              type="email" name="email" value={form.email}
                              onChange={onChange}
                              onFocus={() => setFocused("email")}
                              onBlur={() => setFocused("")}
                              placeholder="you@example.com"
                              className={inputBase("email")}
                            />
                          </Field>
                          <Field label="Phone" error={errors.phone} hint="Optional">
                            <input
                              type="tel" name="phone" value={form.phone}
                              onChange={onChange}
                              onFocus={() => setFocused("phone")}
                              onBlur={() => setFocused("")}
                              placeholder="+1 774-464-2639"
                              className={inputBase("phone")}
                            />
                          </Field>
                        </div>

                        {/* Message */}
                        <Field label="Message" error={errors.message} required>
                          <textarea
                            name="message" value={form.message}
                            onChange={onChange} rows={5}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused("")}
                            placeholder="Tell us about your child and how we can help…"
                            className={`${inputBase("message")} resize-none`}
                          />
                          <div className="flex justify-end mt-1">
                            <span className="text-xs text-gray-300 font-sans">
                              {form.message.length} chars
                            </span>
                          </div>
                        </Field>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-sans font-bold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{
                            background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                            boxShadow: loading ? "none" : "0 6px 24px rgba(255,122,0,0.35)",
                          }}>
                          {loading
                            ? <><Loader2 size={15} className="animate-spin" /> Sending your message…</>
                            : <><Send size={14} strokeWidth={2.5} /> Send Message</>
                          }
                        </motion.button>

                        {/* Trust row */}
                        <div className="flex items-center justify-center gap-5 pt-1">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                            <Shield size={11} className="text-gray-300" />
                            Privacy protected
                          </span>
                          <span className="w-px h-3 bg-gray-200" />
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                            <CheckCircle2 size={11} className="text-gray-300" />
                            No spam, ever
                          </span>
                          <span className="w-px h-3 bg-gray-200" />
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                            <Clock size={11} className="text-gray-300" />
                            Replies in 1 day
                          </span>
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