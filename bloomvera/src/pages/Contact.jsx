import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import PageHero from "../components/ui/PageHero";
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedWrapper";

// ── Connected to backend via .env → REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const contactInfo = [
  { icon: Phone,  label: "Phone",   value: "(123) 456-7890",           href: "tel:+1234567890",               color: "#FF7A00" },
  { icon: Mail,   label: "Email",   value: "info@bloomveraautism.com",  href: "mailto:info@bloomveraautism.com", color: "#00A651" },
  { icon: MapPin, label: "Address", value: "XXX, Your Street\nCity, State, ZIP", href: "#",                   color: "#E91E63" },
];

const hours = [
  ["Monday – Friday", "9:00 AM – 6:00 PM"],
  ["Saturday",        "10:00 AM – 2:00 PM"],
  ["Sunday",          "Closed"],
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
  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Guard: warn if API_URL not configured
    if (!API_URL) {
      toast.error("API URL not configured. Check your .env file.");
      return;
    }
 
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

  const inputCls = field =>
    `w-full px-4 py-3 rounded-xl border font-sans text-sm bg-white transition-all focus:outline-none text-dark placeholder:text-gray-400 ${
      errors[field]
        ? "border-pink-300 focus:border-pink-400"
        : "border-gray-200 focus:border-orange-400 hover:border-gray-300"
    }`;

  return (
    <>
      {/* ── PAGE HERO with contact banner image ── */}
      <PageHero
        tag="Get In Touch"
        title="Let's Start Your Child's"
        highlight="Journey"
        subtitle="Your first consultation is completely free. Reach out and we'll respond within one business day."
        image="/contact.jpeg"
      />

      <section className="section-py bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: Contact Info ── */}
            <div>
              <h2 className="font-sans font-bold text-dark text-2xl tracking-tight mb-2"
                style={{ letterSpacing: "-0.02em" }}>
                We'd Love to Hear From You
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8">
                Whether you have questions, want to schedule an evaluation, or simply need to talk with someone who understands — we're here for you.
              </p>

              <StaggerContainer className="space-y-3 mb-8">
                {contactInfo.map(info => {
                  const Icon = info.icon;
                  return (
                    <StaggerItem key={info.label}>
                      <a href={info.href}
                        className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-card transition-all duration-200 group"
                        style={{ background: `${info.color}06` }}
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-card shrink-0 group-hover:scale-105 transition-transform">
                          <Icon size={17} style={{ color: info.color }} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="font-sans font-semibold text-xs text-muted uppercase tracking-wide">{info.label}</p>
                          <p className="font-sans text-dark text-sm mt-0.5 whitespace-pre-line">{info.value}</p>
                        </div>
                      </a>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Office Hours */}
              <div className="rounded-2xl p-6 text-white" style={{ background: "#0A0A0A" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-orange-400" strokeWidth={2} />
                  <h3 className="font-sans font-semibold text-white text-sm">Office Hours</h3>
                </div>
                <div className="space-y-2.5">
                  {hours.map(([day, time]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500">{day}</span>
                      <span className={`font-sans font-medium ${time === "Closed" ? "text-gray-600" : "text-white"}`}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-card-hover p-7 sm:p-8">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-green-500" strokeWidth={2} />
                    </div>
                    <h3 className="font-sans font-bold text-dark text-xl mb-2">Message Sent!</h3>
                    <p className="text-muted text-sm mb-6 leading-relaxed">
                      Thank you for reaching out. We'll be in touch within one business day.
                    </p>
                    <button
                      onClick={() => setDone(false)}
                      className="text-orange-500 font-sans font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <h3 className="font-sans font-bold text-dark text-lg tracking-tight mb-6"
                      style={{ letterSpacing: "-0.01em" }}>
                      Send Us a Message
                    </h3>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block font-sans font-semibold text-xs text-muted uppercase tracking-wide mb-1.5">
                          Full Name <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text" name="name" value={form.name}
                          onChange={onChange} placeholder="Your full name"
                          className={inputCls("name")}
                        />
                        {errors.name && <p className="mt-1 text-xs text-pink-500">{errors.name}</p>}
                      </div>

                      {/* Email + Phone */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans font-semibold text-xs text-muted uppercase tracking-wide mb-1.5">
                            Email <span className="text-pink-500">*</span>
                          </label>
                          <input
                            type="email" name="email" value={form.email}
                            onChange={onChange} placeholder="your@email.com"
                            className={inputCls("email")}
                          />
                          {errors.email && <p className="mt-1 text-xs text-pink-500">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block font-sans font-semibold text-xs text-muted uppercase tracking-wide mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel" name="phone" value={form.phone}
                            onChange={onChange} placeholder="(123) 456-7890"
                            className={inputCls("phone")}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-pink-500">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block font-sans font-semibold text-xs text-muted uppercase tracking-wide mb-1.5">
                          Message <span className="text-pink-500">*</span>
                        </label>
                        <textarea
                          name="message" value={form.message}
                          onChange={onChange} rows={5}
                          placeholder="Tell us about your child and how we can help..."
                          className={`${inputCls("message")} resize-none`}
                        />
                        {errors.message && <p className="mt-1 text-xs text-pink-500">{errors.message}</p>}
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white font-sans font-bold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        style={{
                          background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                          boxShadow: "0 4px 20px rgba(255,122,0,0.3)",
                        }}
                      >
                        {loading
                          ? <><Loader2 size={15} className="animate-spin" /> Sending...</>
                          : <><Send size={15} strokeWidth={2.5} /> Send Message</>
                        }
                      </motion.button>

                      <p className="text-xs text-muted text-center">
                        We respect your privacy. Your information is never shared.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}