// Button.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Button({ children, variant = "primary", size = "md", to, href, onClick, className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-accent font-semibold rounded-xl transition-all duration-200 cursor-pointer";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary: "bg-gradient-orange-pink text-white shadow-orange hover:shadow-card-hover hover:scale-105",
    secondary: "bg-white text-dark border border-gray-200 hover:border-orange-300 hover:shadow-card",
    green: "bg-gradient-green-emerald text-white shadow-green hover:shadow-card-hover hover:scale-105",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    ghost: "text-orange-500 hover:bg-orange-50",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <motion.span whileTap={{ scale: 0.97 }} className="contents">
      {children}
    </motion.span>
  );

  if (to) return <Link to={to} className={cls} {...props}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{inner}</a>;
  return <button onClick={onClick} className={cls} {...props}>{inner}</button>;
}
