import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from "lucide-react";

const navLinks    = ["/","About Us","/contact-us"].length && [
  { label:"Home",        to:"/" },
  { label:"About Us",    to:"/about-us" },
  { label:"Services",    to:"/services" },
  { label:"FAQ",         to:"/faq" },
  { label:"Contact Us",  to:"/contact-us" },
];
const serviceLinks = [
  { label:"ABA Therapy",          to:"/services" },
  { label:"Social Skills Groups", to:"/services" },
  { label:"Daily Living Skills",  to:"/services" },
  { label:"Home-Based Support",   to:"/services" },
];
const socials = [
  { icon:Facebook,  href:"#", label:"Facebook" },
  { icon:Instagram, href:"#", label:"Instagram" },
  { icon:Twitter,   href:"#", label:"Twitter" },
];

export default function Footer() {
  return (
    <footer style={{ background:"#0A0A0A" }} className="text-white relative overflow-hidden">
      {/* Top accent */}
      <div className="h-0.5" style={{ background:"linear-gradient(90deg,#FF7A00,#E91E63,#00A651)" }} />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-[0.04]" style={{ background:"#FF7A00", transform:"translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.04]" style={{ background:"#00A651", transform:"translate(-30%,30%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="Bloomvera Autism" className="h-9 w-auto object-contain"
                onError={e => e.target.style.display="none"} />
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-white text-[15px]">Bloomvera</span>
                <span className="font-sans text-[9px] tracking-[0.18em] text-orange-400 uppercase">Autism</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering autistic children with compassionate, evidence-based care.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon:Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/6 hover:bg-white/12 flex items-center justify-center text-gray-500 hover:text-white transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ label:"Home",to:"/" },{ label:"About Us",to:"/about-us" },{ label:"Services",to:"/services" },{ label:"FAQ",to:"/faq" },{ label:"Contact Us",to:"/contact-us" }].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-500 hover:text-orange-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(s => (
                <li key={s.label}>
                  <Link to={s.to} className="text-gray-500 hover:text-green-400 text-sm transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin size={14} className="text-orange-400 mt-0.5 shrink-0" />
                <span>XXX Your Address<br/>City, State, ZIP</span>
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-gray-500 hover:text-orange-400 transition-colors">
                  <Phone size={14} className="text-orange-400 shrink-0" /> (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@bloomveraautism.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-orange-400 transition-colors break-all">
                  <Mail size={14} className="text-orange-400 shrink-0" /> info@bloomveraautism.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Bloomvera Autism. All rights reserved.</p>
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            Made with <Heart size={11} className="text-pink-500 fill-pink-500" /> for every child
          </p>
        </div>
      </div>
    </footer>
  );
}
