import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/hero-1.webp",      caption: "One-on-One ABA Therapy Sessions" },
  { image: "/social-skills.webp",      caption: "Building Social Connections" },
  { image: "/aba-therapy.jpg", caption: "Applied Behavior Analysis in Action" },
  { image: "/about-1.jpg",     caption: "Our Dedicated Clinical Team" },
 ];

export default function ImageSlideshow() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setCurrent(c => (c + 1) % slides.length);
  }, []);
  const prev = () => {
    setDir(-1);
    setCurrent(c => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter:  (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="section-py bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-orange-500" />
            <span className="text-orange-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">Gallery</span>
            <span className="h-px w-6 bg-orange-500" />
          </div>
          <h2 className="font-sans font-bold text-dark tracking-tight"
            style={{ fontSize: "clamp(1.9rem,3.5vw,2.75rem)", letterSpacing: "-0.02em" }}>
            A Glimpse Into <span style={{
              background: "linear-gradient(135deg,#FF7A00,#E91E63)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>Our World</span>
          </h2>
        </div>

        {/* Main slideshow */}
        <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{ aspectRatio: "16/7" }}>
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                alt={slides[current].caption}
                className="w-full h-full object-cover ken-burns"
                onError={e => {
                  e.target.parentElement.style.background = "linear-gradient(135deg,#FF7A0018,#E91E6310)";
                  e.target.style.display = "none";
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8"
              >
                <p className="text-white font-sans font-semibold text-sm sm:text-base">{slides[current].caption}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button onClick={prev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-all z-10">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button onClick={next}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-all z-10">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 right-6 sm:right-8 flex items-center gap-1.5 z-10">
            {slides.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                className="transition-all duration-300 rounded-full"
                style={{ width: i === current ? 20 : 6, height: 6, background: i === current ? "#FF7A00" : "rgba(255,255,255,0.5)" }} />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          {slides.map((s, i) => (
            <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
              className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-300 ${i === current ? "ring-2 ring-orange-500 ring-offset-2" : "opacity-55 hover:opacity-80"}`}>
              <img src={s.image} alt={s.caption} className="w-full h-full object-cover"
                onError={e => { e.target.parentElement.style.background = "#f3f4f6"; e.target.style.display = "none"; }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
