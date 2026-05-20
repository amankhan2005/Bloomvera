import React from "react";
import { motion } from "framer-motion";

export default function PageHero({ tag, title, highlight, subtitle, image, overlay = "rgba(0,0,0,0.52)" }) {
  return (
    <section className="relative overflow-hidden flex items-center justify-center text-center"
      style={{ paddingTop: 120, paddingBottom: 80, minHeight: 380 }}>
      {/* BG image */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover ken-burns" onError={e => e.target.style.display="none"} />
          <div className="absolute inset-0" style={{ background: overlay }} />
        </div>
      )}
      {/* Fallback gradient when no image */}
      {!image && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0A0A0A 0%,#1F2937 100%)" }} />
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
        {tag && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
            className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-5 bg-orange-400" />
            <span className="text-orange-400 font-sans font-semibold text-xs tracking-[0.18em] uppercase">{tag}</span>
            <span className="h-px w-5 bg-orange-400" />
          </motion.div>
        )}
        <motion.h1
          initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.1,ease:[0.22,1,0.36,1]}}
          className="font-sans font-bold text-white leading-tight tracking-tight mb-5"
          style={{ fontSize:"clamp(2.2rem,5vw,3.75rem)", letterSpacing:"-0.025em" }}
        >
          {title}{" "}
          {highlight && (
            <span style={{background:"linear-gradient(135deg,#FF7A00,#E91E63)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              {highlight}
            </span>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.22}}
            className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
