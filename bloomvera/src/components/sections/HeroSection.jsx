import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const [videoErr, setVideoErr] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-dark"
      style={{ height: "100svh", minHeight: 600 }}>

      {/* ── VIDEO / FALLBACK BACKGROUND ── */}
      {!videoErr ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="auto"
          onError={() => setVideoErr(true)}
          poster="/hero-1.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0">
          <img src="/hero-1.png" alt="Hero" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-video-overlay" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="text-white/90 text-xs font-sans font-semibold tracking-[0.14em] uppercase">
            Compassionate Autism Care
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22,1,0.36,1] }}
          className="font-sans font-bold text-white leading-[1.08] tracking-tight max-w-4xl mb-6"
          style={{ fontSize: "clamp(2.6rem,7vw,5.2rem)", letterSpacing: "-0.025em" }}
        >
          Helping Every Child<br />
          <span style={{
            background: "linear-gradient(135deg,#FF7A00 0%,#E91E63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Bloom & Thrive
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg mb-10"
        >
          Personalized, evidence-based therapy empowering autistic children to develop skills, build confidence, and reach their full potential.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link to="/contact-us"
            className="group inline-flex items-center gap-2 px-7 py-4 text-white font-sans font-bold text-sm rounded-2xl transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#FF7A00,#E91E63)", boxShadow: "0 6px 28px rgba(255,122,0,0.45)" }}>
            Book Free Consultation
            <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/services"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white/12 text-white font-sans font-semibold text-sm rounded-2xl border border-white/25 backdrop-blur-md hover:bg-white/20 transition-all hover:-translate-y-0.5">
            <Play size={14} strokeWidth={2.5} className="fill-white" />
            Our Services
          </Link>
        </motion.div>
      </div>

      {/* ── BOTTOM STATS BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.75 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-5 pb-8">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["50+","Families Served"],
              ["4","Core Programs"],
              ["100%","Child-Centered"],
            ].map(([val, lab]) => (
              <div key={lab}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl py-4 px-3 text-center">
                <p className="font-sans font-bold text-white leading-none mb-1"
                  style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>{val}</p>
                <p className="text-white/60 text-[11px] sm:text-xs font-sans leading-tight">{lab}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
