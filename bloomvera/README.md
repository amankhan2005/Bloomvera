# Bloomvera Autism — Frontend

Premium, animated React.js website for Bloomvera Autism.

## Tech Stack
- React 18
- Tailwind CSS
- Framer Motion
- React Router v6
- React Hot Toast
- Lucide React Icons
- DM Sans + Playfair Display + Nunito (Google Fonts)

## Quick Start

```bash
npm install
npm start
```

Runs at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Sticky animated navbar + mobile menu
│   │   └── Footer.jsx         # Full footer with links and social icons
│   ├── sections/
│   │   ├── HeroSection.jsx    # Animated hero with floating shapes
│   │   ├── ServicesSection.jsx # 4-service card grid
│   │   ├── WhyChooseUs.jsx    # 6 trust cards
│   │   ├── MissionVision.jsx  # Split gradient cards
│   │   └── CTASection.jsx     # Dark animated CTA
│   └── ui/
│       ├── Button.jsx         # Reusable button variants
│       ├── SectionHeading.jsx # Animated section title
│       ├── AnimatedWrapper.jsx # FadeUp, FadeIn, Stagger wrappers
│       ├── FAQAccordion.jsx   # Animated accordion component
│       ├── PageLoader.jsx     # Loading spinner
│       └── ScrollToTop.jsx    # Auto scroll on route change
├── pages/
│   ├── Home.jsx       # Full homepage
│   ├── About.jsx      # About Us with timeline + team
│   ├── Services.jsx   # Tabbed detailed services
│   ├── FAQ.jsx        # Searchable FAQ with categories
│   └── Contact.jsx    # Form with validation + toast
├── App.jsx            # Router + page transitions + Toaster
├── index.js           # React DOM entry
└── index.css          # Global styles + Tailwind + fonts
```

## Brand Colors

| Name | Hex |
|------|-----|
| Primary Orange | #FF7A00 |
| Secondary Green | #00A651 |
| Accent Pink | #E91E63 |
| Dark Text | #1F2937 |
| Background | #F8F8F8 |

## Connecting the Backend (Contact Form)

In `Contact.jsx`, replace the simulated API call:

```js
// Replace this:
await new Promise((res) => setTimeout(res, 1800));

// With your backend call:
const res = await fetch("http://localhost:5000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (!res.ok) throw new Error("Failed");
```

## Domain
bloomveraautism.com
