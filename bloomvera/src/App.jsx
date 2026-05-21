import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import PageLoader from "./components/ui/PageLoader";
import Chatbot from "./components/ui/Chatbot";
import "./index.css";

const Home    = lazy(() => import("./pages/Home"));
const About   = lazy(() => import("./pages/About"));
const Services= lazy(() => import("./pages/Services"));
const FAQ     = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Career  = lazy(() => import("./pages/Career"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22,1,0.36,1] } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"           element={<Home />} />
            <Route path="/about-us"   element={<About />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/faq"        element={<FAQ />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/career"     element={<Career />} />
            <Route path="/about"      element={<About />} />
            <Route path="/contact"    element={<Contact />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1"><AnimatedRoutes /></main>
          <Footer />
        </div>
        <Chatbot />
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily:"'Inter',sans-serif", borderRadius:"12px", boxShadow:"0 4px 24px rgba(0,0,0,0.1)", fontSize:"14px" },
          success: { iconTheme: { primary:"#00A651", secondary:"#fff" } },
          error:   { iconTheme: { primary:"#E91E63", secondary:"#fff" } },
        }} />
      </Router>
    </ThemeProvider>
  );
}
