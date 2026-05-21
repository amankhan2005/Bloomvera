import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "FAQ", to: "/faq" },
  { label: "Career", to: "/career" },
  { label: "Contact Us", to: "/contact-us" },
];
const serviceLinks = [
  { label: "ABA Therapy", to: "/services" },
  { label: "Social Skills Groups", to: "/services" },
  { label: "Daily Living Skills", to: "/services" },
  { label: "Home-Based Support", to: "/services" },
];
const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  const { dark } = useTheme();

  const bg = dark ? "#1A2332" : "#1b2640";
  const textMuted = dark ? "#9CA3AF" : "#d0d1d2";
  const textLink = dark ? "#D1D5DB" : "#d0d1d2";
  const headingColor = "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)";

  return (
    <footer style={{ background: bg }} className="relative overflow-hidden transition-colors duration-300">
      {/* Top accent */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg,#FF7A00,#E91E63,#00A651)" }} />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-[0.06]"
        style={{ background: "#FF7A00", transform: "translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.06]"
        style={{ background: "#00A651", transform: "translate(-30%,30%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="Bloomvera Autism" className="h-9 w-auto object-contain"
                onError={e => e.target.style.display = "none"} />
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-white text-[15px]">Bloomvera</span>
                <span className="font-sans text-[9px] tracking-[0.18em] text-orange-400 uppercase">Autism</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: textMuted }}>
              Empowering autistic children with compassionate, evidence-based care.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: textMuted,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-5" style={{ color: headingColor }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors hover:text-orange-400" style={{ color: textLink }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-5" style={{ color: headingColor }}>Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(s => (
                <li key={s.label}>
                  <Link to={s.to} className="text-sm transition-colors hover:text-green-400" style={{ color: textLink }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-5" style={{ color: headingColor }}>Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com/?q=2823+Marietta+St,+Steilacoom,+WA+98388"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-orange-400"
                  style={{ color: textMuted }}>
                  <MapPin size={14} className="text-orange-400 mt-0.5 shrink-0" />
                  <span>2823 Marietta St<br />Steilacoom, WA 98388</span>
                </a>
              </li>
              <li>
                <a href="tel:+17744642639"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-orange-400"
                  style={{ color: textMuted }}>
                  <Phone size={14} className="text-orange-400 shrink-0" />
                  +1 774-464-2639
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: textMuted }}>
                <Phone size={14} className="text-orange-400 shrink-0" />
                Fax: +1 206-756-1330
              </li>
              <li>
                <a href="mailto:info@bloomveraautism.com"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-orange-400 break-all"
                  style={{ color: textMuted }}>
                  <Mail size={14} className="text-orange-400 shrink-0" />
                  info@bloomveraautism.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${border}` }}>
          <p className="text-xs" style={{ color: textMuted }}>
            © {new Date().getFullYear()} Bloomvera Autism. All rights reserved.
          </p>
          <p className="text-xs text-center sm:text-right" style={{ color: textMuted }}>
            Designed & Developed by{" "}
            <a href="https://www.webieapp.com/" target="_blank" rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors font-medium">
              WebieApp Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
