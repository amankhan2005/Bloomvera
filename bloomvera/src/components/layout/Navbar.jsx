import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight, Sparkles } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "FAQ", to: "/faq" },
 ];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        .nav-link-text {
          position: relative;
          z-index: 1;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .scroll-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          border-radius: 0 2px 0 0;
          background: linear-gradient(90deg, #FF7A00, #E91E63);
          transition: width 0.1s linear;
        }
        .drawer-link-active {
          background: linear-gradient(135deg, rgba(255,122,0,0.08), rgba(233,30,99,0.06));
          border-left: 2.5px solid #FF7A00;
        }
        .drawer-link-idle {
          border-left: 2.5px solid transparent;
        }
        .glass-nav {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .logo-glow {
          filter: drop-shadow(0 0 12px rgba(255,122,0,0.35));
        }
        .cta-btn {
          background: linear-gradient(135deg,#FF7A00,#E91E63);
          box-shadow: 0 4px 16px rgba(255,122,0,0.32);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255,122,0,0.42);
        }
        .cta-btn:active { transform: scale(0.98); }

        .drawer-overlay {
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
      `}</style>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
        style={{ paddingTop: scrolled ? 10 : 18, paddingBottom: scrolled ? 10 : 18 }}
      >
        {/* Scroll progress bar */}
        {scrolled && (
          <div className="scroll-bar" style={{ width: `${scrollProgress}%` }} />
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.png"
              alt="Bloomvera Autism"
              className={`h-9 w-auto object-contain transition-all duration-300 ${scrolled ? "" : "logo-glow"}`}
              onError={e => (e.target.style.display = "none")}
            />
            <div className="flex flex-col leading-none">
              <span className={`font-sans font-bold text-[15px] tracking-tight transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                Bloomvera
              </span>
              <span className="font-sans font-semibold text-[9px] tracking-[0.2em] text-orange-400 uppercase">
                Autism Care
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 rounded-xl transition-all duration-200 nav-link-text ${
                    isActive
                      ? "text-orange-500"
                      : scrolled
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-xl ${
                          scrolled ? "bg-orange-50" : "bg-white/12"
                        }`}
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:+17744642639"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                scrolled ? "text-gray-500 hover:text-orange-500" : "text-white/75 hover:text-white"
              }`}
            >
              <Phone size={13} strokeWidth={2.5} />
              <span>+1 774-464-2639</span>
            </a>

            <Link
              to="/contact-us"
              className="cta-btn px-5 py-2.5 text-white font-sans font-semibold text-sm rounded-xl flex items-center gap-1.5"
            >
              <Sparkles size={13} strokeWidth={2} />
              Book Free Consult
            </Link>
          </div>

          {/* ── MOBILE BUTTONS ── */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href="tel:+17744642639"
              aria-label="Call us"
              className={`p-2 rounded-xl transition-all ${
                scrolled
                  ? "text-orange-500 bg-orange-50"
                  : "text-white bg-white/10"
              }`}
            >
              <Phone size={18} strokeWidth={2.5} />
            </a>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={`p-2 rounded-xl transition-all ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}>
                    <X size={21} />
                  </motion.span>
                ) : (
                  <motion.span key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}>
                    <Menu size={21} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 drawer-overlay md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col bg-white"
              style={{ width: "min(310px, 88vw)", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="Bloomvera"
                    className="h-8 w-auto object-contain"
                    onError={e => (e.target.style.display = "none")}
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-sans font-bold text-gray-900 text-[14px] tracking-tight">Bloomvera</span>
                    <span className="font-sans text-[9px] tracking-[0.2em] text-orange-400 uppercase font-semibold">Autism Care</span>
                  </div>
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X size={15} className="text-gray-500" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3.5 rounded-xl font-sans font-medium text-sm transition-all ${
                          isActive
                            ? "drawer-link-active text-orange-600"
                            : "drawer-link-idle text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isActive ? "bg-orange-100" : "bg-gray-100"
                          }`}>
                            <ChevronRight
                              size={12}
                              strokeWidth={2.5}
                              className={isActive ? "text-orange-500" : "text-gray-400"}
                            />
                          </div>
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="px-5 pb-8 pt-4 space-y-3"
                style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                {/* Subtle brand strip */}
                <div className="rounded-2xl p-4 mb-1 text-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,rgba(255,122,0,0.07),rgba(233,30,99,0.07))" }}>
                  <div className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,122,0,0.3) 0%, transparent 60%)" }} />
                  <p className="text-xs text-gray-500 font-sans relative z-10">
                    Compassionate care for every child
                  </p>
                </div>

                <Link
                  to="/contact-us"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-white font-sans font-semibold text-sm rounded-2xl cta-btn"
                >
                  <Sparkles size={14} strokeWidth={2} />
                  Book Free Consultation
                </Link>

                <a
                  href="tel:+17744642639"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border font-sans font-medium text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                >
                  <Phone size={14} strokeWidth={2.5} />
                  +1 774-464-2639
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}