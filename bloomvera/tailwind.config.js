/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange:  { DEFAULT:"#FF7A00", 50:"#FFF5EB", 100:"#FFE4BF", 400:"#FF9933", 500:"#FF7A00", 600:"#CC6200" },
        green:   { DEFAULT:"#00A651", 50:"#E8F8F0", 100:"#C0EDD7", 400:"#33C47A", 500:"#00A651", 600:"#007D3D" },
        pink:    { DEFAULT:"#E91E63", 50:"#FDE8F0", 100:"#F9C0D6", 400:"#F06292", 500:"#E91E63", 600:"#C2185B" },
        dark:    "#0A0A0A",
        mid:     "#374151",
        light:   "#F9FAFB",
        muted:   "#6B7280",
      },
      fontFamily: {
        sans:    ["'Inter'","system-ui","-apple-system","sans-serif"],
        display: ["'Inter'","system-ui","sans-serif"],
      },
      backgroundImage: {
        "g-orange-pink":   "linear-gradient(135deg,#FF7A00 0%,#E91E63 100%)",
        "g-green-emerald": "linear-gradient(135deg,#00A651 0%,#00C46B 100%)",
        "g-dark":          "linear-gradient(135deg,#0A0A0A 0%,#1F2937 100%)",
      },
      boxShadow: {
        "card":        "0 2px 8px rgba(0,0,0,0.06),0 8px 24px rgba(0,0,0,0.06)",
        "card-hover":  "0 8px 30px rgba(0,0,0,0.12),0 20px 50px rgba(0,0,0,0.08)",
        "orange":      "0 4px 20px rgba(255,122,0,0.28)",
        "orange-lg":   "0 8px 36px rgba(255,122,0,0.38)",
        "green":       "0 4px 20px rgba(0,166,81,0.28)",
        "glass":       "0 4px 30px rgba(0,0,0,0.06)",
        "nav":         "0 1px 0 rgba(0,0,0,0.08),0 4px 24px rgba(0,0,0,0.06)",
      },
      borderRadius: { "2xl":"1rem","3xl":"1.5rem","4xl":"2rem","5xl":"2.5rem" },
    },
  },
  plugins: [],
};
