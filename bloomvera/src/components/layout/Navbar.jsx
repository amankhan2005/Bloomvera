import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/96 backdrop-blur-xl shadow-nav"
            : "bg-transparent"
        }`}
        style={{ padding: scrolled ? "12px 0" : "20px 0" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/logo.png"
              alt="Bloomvera Autism"
              className="h-9 w-auto object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="flex flex-col leading-none">
              <span
                className={`font-sans font-bold text-[15px] tracking-tight transition-colors ${
                  scrolled ? "text-dark" : "text-white"
                }`}
              >
                Bloomvera
              </span>

              <span className="font-sans font-semibold text-[9px] tracking-[0.18em] text-orange-400 uppercase">
                Autism
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 rounded-xl font-sans font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "text-orange-500"
                      : scrolled
                      ? "text-mid hover:text-dark"
                      : "text-white/85 hover:text-white"
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
                          scrolled ? "bg-orange-50" : "bg-white/10"
                        }`}
                        style={{ zIndex: -1 }}
                        transition={{
                          type: "spring",
                          stiffness: 440,
                          damping: 38,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:+17744642639"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-mid hover:text-orange-500"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone size={13} strokeWidth={2.5} />
              <span>+1 774-464-2639</span>
            </a>

            <Link
              to="/contact-us"
              className="px-5 py-2.5 text-white font-sans font-semibold text-sm rounded-xl transition-all hover:-translate-y-px"
              style={{
                background:
                  "linear-gradient(135deg,#FF7A00,#E91E63)",
                boxShadow:
                  "0 4px 16px rgba(255,122,0,0.32)",
              }}
            >
              Book Free Consult
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href="tel:+17744642639"
              aria-label="Call"
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-orange-500" : "text-white"
              }`}
            >
              <Phone size={19} strokeWidth={2.5} />
            </a>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-dark hover:bg-gray-100"
                  : "text-white"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="dr"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col bg-white shadow-2xl"
              style={{ width: "min(300px,85vw)" }}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img
                    src="/logo.png"
                    alt="Bloomvera Autism"
                    className="h-8 w-auto object-contain"
                    onError={(e) =>
                      (e.target.style.display = "none")
                    }
                  />

                  <span className="font-sans font-bold text-dark text-sm">
                    Bloomvera{" "}
                    <span className="text-orange-500">
                      Autism
                    </span>
                  </span>
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.22,
                    }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3.5 rounded-xl font-sans font-medium text-sm mb-0.5 transition-colors ${
                          isActive
                            ? "bg-orange-50 text-orange-500"
                            : "text-dark hover:bg-gray-50"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          <ChevronRight
                            size={14}
                            strokeWidth={2.5}
                            className={
                              isActive
                                ? "text-orange-400"
                                : "text-gray-300"
                            }
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="px-5 pb-8 pt-4 border-t border-gray-100 space-y-3"
              >
                <Link
                  to="/contact-us"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 text-white font-sans font-semibold text-sm rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg,#FF7A00,#E91E63)",
                    boxShadow:
                      "0 4px 18px rgba(255,122,0,0.3)",
                  }}
                >
                  Book Free Consultation
                </Link>

                <a
                  href="tel:+17744642639"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-gray-200 text-sm font-sans font-medium text-gray-600"
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