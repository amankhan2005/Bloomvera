import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ─── WEBSITE KNOWLEDGE BASE ────────────────────────────────────────────────────
const WEBSITE_DATA = {
  greetings: {
    keywords: ["hi", "hello", "hey", "hii", "hlo", "helo", "hy", "howdy", "namaste", "salam", "good morning", "good afternoon", "good evening", "sup", "whats up", "what's up"],
    reply: (name) => `Hello ${name} 👋 How may I help you today?<br/><br/>I can assist you with information about our <b>therapy services</b>, <b>consultations</b>, <b>career opportunities</b>, <b>contact details</b>, and much more.`,
  },
  aba: {
    keywords: ["aba", "behavior", "behaviour", "behavioral", "behavioural", "tantrum", "aggression", "aggressive", "aggresive", "agressive", "hyperactive", "hyperactivity", "focus issue", "focus problem", "autism behavior", "autistic behavior", "child behavior", "kid behavior", "anger", "meltdown", "melt down", "repetitive", "stimming", "self harm", "hitting", "biting", "applied behavior", "positive reinforcement", "reinforcement"],
    reply: (name) => `🧠 <b>ABA Therapy – Applied Behavior Analysis</b><br/><br/>
ABA Therapy is the gold-standard, evidence-based treatment for autism. It uses positive reinforcement to build essential life skills.<br/><br/>
<b>What it helps with:</b><br/>
• Improving communication & language<br/>
• Reducing challenging behaviors (tantrums, aggression)<br/>
• Building social & emotional skills<br/>
• Developing daily living independence<br/>
• Improving focus & attention<br/><br/>
Sessions are delivered one-on-one by certified BCBAs and RBTs, tailored to your child's unique needs.<br/><br/>
📞 <b>Book a free consultation:</b> +1 774-464-2639`,
  },
  social: {
    keywords: ["social", "social skill", "social skills", "friends", "friendship", "peer", "peer interaction", "communication", "communicate", "shy", "introvert", "group", "play", "interaction", "making friends", "talking to people", "social anxiety"],
    reply: (name) => `👥 <b>Social Skills Groups – Peer Interaction Programs</b><br/><br/>
Our structured group sessions help children practice real-world social skills in a safe, therapist-guided environment.<br/><br/>
<b>Benefits:</b><br/>
• Practice real conversations & scenarios<br/>
• Build friendships with peers<br/>
• Develop emotional regulation<br/>
• Gain confidence in group settings<br/>
• Learn turn-taking, sharing & cooperation<br/><br/>
Children are matched by age and skill level for the best outcomes.<br/><br/>
📞 Call us: <b>+1 774-464-2639</b>`,
  },
  daily: {
    keywords: ["daily living", "daily skill", "independence", "self care", "self-care", "routine", "hygiene", "dressing", "eating", "cooking", "meal", "life skill", "life skills", "independent", "toilet", "potty", "bathing", "grooming", "household"],
    reply: (name) => `✨ <b>Daily Living Skills – Independence Training</b><br/><br/>
We provide step-by-step training to help children develop independence in everyday tasks.<br/><br/>
<b>Skills we work on:</b><br/>
• Personal hygiene & grooming<br/>
• Dressing & self-care routines<br/>
• Meal preparation & safety<br/>
• Home organization<br/>
• Community navigation<br/><br/>
Our therapists use task analysis to break each skill into manageable steps, gradually building independence.`,
  },
  home: {
    keywords: ["home", "home based", "home-based", "in home", "in-home", "home therapy", "home support", "home visit", "at home", "house", "home service"],
    reply: (name) => `🏠 <b>Home-Based Support – In-Home Autism Care</b><br/><br/>
Our certified therapists come directly to your home, providing personalized support where your child feels most comfortable.<br/><br/>
<b>Why home-based therapy?</b><br/>
• Children progress faster in familiar surroundings<br/>
• Skills generalize to real daily situations<br/>
• Active family coaching included<br/>
• Flexible scheduling that fits your family<br/>
• Immediate skill application in home environment<br/><br/>
📞 Schedule a home visit: <b>+1 774-464-2639</b>`,
  },
  speech: {
    keywords: ["speech", "speaking", "speak", "talk", "talking", "language", "not talking", "not speaking", "communication issue", "communication problem", "late talking", "late speaking", "speech delay", "language delay", "pronunciation", "words", "verbal", "nonverbal", "non verbal", "bol nahi", "bolta nahi", "bolti nahi", "speach", "spech"],
    reply: (name) => `🗣️ <b>Speech & Communication Support</b><br/><br/>
We understand how concerning it can be when a child struggles with speaking or communication.<br/><br/>
Our ABA Therapy and Social Skills programs both address communication challenges, helping children:<br/><br/>
• Develop verbal & non-verbal communication<br/>
• Improve pronunciation & language skills<br/>
• Build vocabulary and sentence structure<br/>
• Learn to express needs and emotions<br/><br/>
Early intervention makes a huge difference. <b>Book a free assessment</b> to understand your child's specific needs.<br/><br/>
📞 <b>+1 774-464-2639</b> &nbsp;|&nbsp; ✉️ <b>info@bloomveraautism.com</b>`,
  },
  occupational: {
    keywords: ["occupational", "sensory", "motor", "motor skill", "fine motor", "gross motor", "handwriting", "writing", "sensory issue", "sensory processing", "body movement", "coordination", "balance", "ot", "occupational therapy"],
    reply: (name) => `🖐️ <b>Occupational & Sensory Support</b><br/><br/>
Our therapy programs address sensory processing and motor skill challenges that many autistic children face.<br/><br/>
<b>We help with:</b><br/>
• Sensory processing difficulties<br/>
• Fine & gross motor skill development<br/>
• Handwriting & coordination<br/>
• Body awareness & balance<br/>
• Daily activity independence<br/><br/>
Contact us to discuss your child's specific sensory or motor needs.<br/><br/>
📞 <b>+1 774-464-2639</b>`,
  },
  assessment: {
    keywords: ["assessment", "assess", "evaluation", "evaluate", "diagnosis", "diagnose", "screening", "screen", "consultation", "consult", "test", "testing", "check", "autism test", "is my child autistic", "autism check", "autism diagnosis"],
    reply: (name) => `📋 <b>Free Consultation & Assessment</b><br/><br/>
Getting started with Bloomvera is easy — and your first consultation is <b>completely free</b>.<br/><br/>
<b>How it works:</b><br/>
1️⃣ Contact us to schedule a free consultation<br/>
2️⃣ Our clinical team reviews your child's needs<br/>
3️⃣ We assess strengths, challenges & goals<br/>
4️⃣ We recommend a personalized care plan<br/><br/>
No obligation. No pressure. Just a caring conversation.<br/><br/>
📞 <b>+1 774-464-2639</b><br/>
✉️ <b>info@bloomveraautism.com</b>`,
  },
  parent: {
    keywords: ["parent", "parents", "family", "family support", "caregiver", "guardian", "mom", "dad", "mother", "father", "parent training", "parent guidance", "home training", "how to help", "what can i do", "parenting"],
    reply: (name) => `👨‍👩‍👧 <b>Family & Parent Support</b><br/><br/>
We believe parents are essential partners in every child's journey. That's why family involvement is central to everything we do.<br/><br/>
<b>Support we provide to families:</b><br/>
• Dedicated parent coaching sessions<br/>
• Behavior management strategies for home<br/>
• Communication techniques & tools<br/>
• Progress reports & goal reviews<br/>
• Guidance on supporting routines at home<br/><br/>
You're not alone in this journey. We're here to support the whole family.<br/><br/>
📞 Talk to our team: <b>+1 774-464-2639</b>`,
  },
  contact: {
    keywords: ["contact", "reach", "phone", "call", "email", "mail", "address", "location", "office", "hours", "timing", "fax", "whatsapp", "support", "help desk", "helpdesk", "reach us", "get in touch", "how to contact"],
    reply: (name) => `📞 <b>Contact Bloomvera Autism</b><br/><br/>
<b>📱 Phone:</b> +1 774-464-2639<br/>
<b>📠 Fax:</b> +1 206-756-1330<br/>
<b>✉️ Email:</b> info@bloomveraautism.com<br/>
<b>📍 Address:</b> 2823 Marietta St, Steilacoom, WA 98388<br/><br/>
<b>🕐 Office Hours:</b><br/>
Monday – Friday: 9:00 AM – 6:00 PM<br/>
Saturday: 10:00 AM – 2:00 PM<br/>
Sunday: Closed<br/><br/>
We typically respond within <b>one business day</b>.`,
  },
  career: {
    keywords: ["career", "careers", "job", "jobs", "vacancy", "vacancies", "hiring", "hire", "opening", "openings", "apply", "application", "work", "employment", "opportunity", "opportunities", "position", "join", "join us", "work with us", "bcba", "rbt", "therapist", "technician", "coach", "staff"],
    reply: (name) => `💼 <b>Career Opportunities at Bloomvera</b><br/><br/>
We're always looking for passionate people dedicated to making a difference in children's lives!<br/><br/>
<b>Current Openings:</b><br/>
• BCBA – Board Certified Behavior Analyst <i>(Full-Time)</i><br/>
• Registered Behaviour Technician – RBT <i>(Full-Time / Part-Time)</i><br/>
• Social Skills Coach <i>(Part-Time / Remote)</i><br/>
• Home Support Specialist <i>(Full-Time)</i><br/><br/>
<b>Why join us?</b><br/>
✓ Meaningful, rewarding work<br/>
✓ Paid training & CEU support<br/>
✓ Collaborative team culture<br/>
✓ Competitive salary & benefits<br/><br/>
📩 Apply at: <b>info@bloomveraautism.com</b>`,
  },
  about: {
    keywords: ["about", "about us", "who are you", "who is bloomvera", "company", "organization", "story", "history", "founded", "mission", "vision", "approach", "team", "bloomvera", "tell me about", "what is bloomvera"],
    reply: (name) => `💙 <b>About Bloomvera Autism</b><br/><br/>
Bloomvera Autism was founded by a team of dedicated clinicians and family advocates who recognized a critical need — autism care that is both clinically rigorous and deeply human.<br/><br/>
<b>Our Mission:</b> Every autistic child deserves compassionate, evidence-based support to discover their strengths and thrive.<br/><br/>
<b>Our Approach:</b> We integrate proven therapies with genuine care for each child and family. Our therapists aren't just clinicians — they are dedicated partners in your journey.<br/><br/>
Every program is individually tailored. No two children are the same, and neither are their care plans.<br/><br/>
📞 <b>+1 774-464-2639</b>`,
  },
  cost: {
    keywords: ["price", "pricing", "cost", "fee", "fees", "charges", "how much", "payment", "insurance", "covered", "afford", "affordable", "expensive", "cheap", "rate", "rates", "billing"],
    reply: (name) => `💰 <b>Pricing & Insurance</b><br/><br/>
We understand that cost is an important consideration for families.<br/><br/>
<b>Free Initial Consultation</b> — completely free, no obligation.<br/><br/>
Therapy costs vary depending on:<br/>
• Type of service needed<br/>
• Session frequency & duration<br/>
• Individual care plan<br/><br/>
We are actively working to accept a variety of insurance plans. Contact us directly to discuss your specific coverage and available options.<br/><br/>
📞 <b>+1 774-464-2639</b><br/>
✉️ <b>info@bloomveraautism.com</b>`,
  },
  book: {
    keywords: ["book", "booking", "schedule", "appointment", "consult", "consultation", "free consult", "start", "begin", "get started", "enroll", "register", "sign up", "signup"],
    reply: (name) => `✨ <b>Book a Free Consultation</b><br/><br/>
Getting started is simple — and your first consultation is <b>completely free</b>!<br/><br/>
<b>3 Easy Ways to Connect:</b><br/><br/>
📞 <b>Call us:</b> +1 774-464-2639<br/>
✉️ <b>Email us:</b> info@bloomveraautism.com<br/>
💬 <b>Message us</b> through our Contact page<br/><br/>
Our team will reach out within <b>24 hours</b> to schedule your consultation.`,
  },
  services: {
    keywords: ["service", "services", "program", "programs", "therapy", "therapies", "treatment", "what do you offer", "what you provide", "what you do", "offerings", "all services", "list services"],
    reply: (name) => `🌱 <b>Our Services at Bloomvera</b><br/><br/>
We offer four specialized programs for children with autism:<br/><br/>
<b>1. ABA Therapy</b> – Evidence-based behavioral therapy using positive reinforcement.<br/><br/>
<b>2. Social Skills Groups</b> – Therapist-guided group sessions for real-world social practice.<br/><br/>
<b>3. Daily Living Skills</b> – Independence training for self-care and everyday tasks.<br/><br/>
<b>4. Home-Based Support</b> – Certified therapists come directly to your home.<br/><br/>
All programs are tailored to your child's individual needs. 📞 <b>+1 774-464-2639</b>`,
  },
  age: {
    keywords: ["age", "ages", "how old", "toddler", "infant", "baby", "teen", "teenager", "adult", "year old", "years old"],
    reply: (name) => `👶 <b>Age Groups We Serve</b><br/><br/>
We support children from <b>toddlers through teenagers</b>.<br/><br/>
• <b>Early intervention (2–5 years):</b> Most impactful time for therapy<br/>
• <b>School age (6–12 years):</b> Focus on social skills & independence<br/>
• <b>Teens (13–18 years):</b> Life skills & community integration<br/><br/>
It's <b>never too late</b> to begin — every child can make meaningful progress.<br/><br/>
📞 <b>+1 774-464-2639</b>`,
  },
};

// ─── FUZZY MATCHING ───────────────────────────────────────────────────────────
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function detectIntent(input) {
  const q = input.toLowerCase().trim();
  for (const [key, data] of Object.entries(WEBSITE_DATA)) {
    for (const kw of data.keywords) {
      if (q.includes(kw)) return key;
      if (kw.length > 4 && levenshtein(q, kw) <= 2) return key;
      const kwWords = kw.split(" ");
      if (kwWords.length > 1 && kwWords.every(w => q.includes(w))) return key;
    }
  }
  return null;
}

// ─── NAME DETECTION ───────────────────────────────────────────────────────────
function extractName(input) {
  const cleaned = input.trim();
  // Reject if it looks like a question or too long
  if (cleaned.length > 40) return null;
  if (/[?!@#$%^&*()=+\[\]{};:,<>\/\\|]/.test(cleaned)) return null;
  if (/\b(what|how|why|when|where|who|is|are|do|does|can|help|service|therapy)\b/i.test(cleaned)) return null;
  // Capitalize first letter
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

// ─── FALLBACK ─────────────────────────────────────────────────────────────────
const FALLBACK = (name) => `I'd be happy to help 😊<br/><br/>Could you tell me a bit more about what you're looking for? I can assist with:<br/><br/>
• 🧠 <b>Therapy programs</b> (ABA, Social Skills, Daily Living, Home-Based)<br/>
• 📋 <b>Free consultation</b> & assessment<br/>
• 👨‍👩‍👧 <b>Parent & family support</b><br/>
• 💼 <b>Career opportunities</b><br/>
• 📞 <b>Contact & location info</b><br/><br/>
Or reach us at <b>+1 774-464-2639</b> or <b>info@bloomveraautism.com</b>`;

// ─── OCCASIONALLY USE NAME ────────────────────────────────────────────────────
// Use name in ~1 out of 3 replies to feel natural
let replyCount = 0;
function namePrefix(name) {
  replyCount++;
  if (!name || replyCount % 3 !== 0) return "";
  return `Sure ${name}, `;
}

// ─── INITIAL MESSAGES ─────────────────────────────────────────────────────────
const ASK_NAME_MSG = {
  id: 0,
  role: "bot",
  html: `Hello 👋 Welcome to <b>Bloomvera Autism</b>!<br/><br/>What's your name?`,
};

let msgId = 1;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Chatbot() {
  const { dark }           = useTheme();
  const [open, setOpen]    = useState(false);
  const [msgs, setMsgs]    = useState([ASK_NAME_MSG]);
  const [input, setInput]  = useState("");
  const [typing, setTyping]= useState(false);
  const [chipsOpen, setChipsOpen] = useState(true);

  // Name flow
  const [nameCollected, setNameCollected] = useState(() => !!sessionStorage.getItem("bv_userName"));
  const [userName, setUserName]           = useState(() => sessionStorage.getItem("bv_userName") || "");

  // Prevent duplicate responses
  const pendingRef = useRef(false);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 280);
  }, [open]);

  // Auto-collapse chips when user starts typing
  useEffect(() => {
    if (input.length > 0) setChipsOpen(false);
  }, [input]);

  const send = useCallback(() => {
    const q = input.trim();
    if (!q || typing || pendingRef.current) return;

    pendingRef.current = true;
    setInput("");

    const userMsg = { id: msgId++, role: "user", text: q };
    setMsgs(prev => [...prev, userMsg]);
    setTyping(true);

    const delay = 600 + Math.random() * 500;

    // ── NAME COLLECTION FLOW ──────────────────────────────────────────────
    if (!nameCollected) {
      const name = extractName(q);
      setTimeout(() => {
        setTyping(false);
        pendingRef.current = false;

        if (name) {
          // Valid name — save and greet
          sessionStorage.setItem("bv_userName", name);
          setUserName(name);
          setNameCollected(true);
          setMsgs(prev => [...prev, {
            id: msgId++,
            role: "bot",
            html: `Nice to meet you, <b>${name}</b> 😊 How may I help you today?<br/><br/>You can ask me about our <b>therapy services</b>, <b>consultations</b>, <b>career opportunities</b>, or anything else.`,
          }]);
        } else {
          // Could not extract name — ask again
          setMsgs(prev => [...prev, {
            id: msgId++,
            role: "bot",
            html: `I didn't quite catch your name 😊 Could you please tell me your name?`,
          }]);
        }
      }, delay);
      return;
    }

    // ── NORMAL CHAT FLOW ──────────────────────────────────────────────────
    const intent   = detectIntent(q);
    const prefix   = namePrefix(userName);
    const replyHtml = intent
      ? prefix + WEBSITE_DATA[intent].reply(userName)
      : FALLBACK(userName);

    setTimeout(() => {
      setTyping(false);
      pendingRef.current = false;
      setMsgs(prev => [...prev, { id: msgId++, role: "bot", html: replyHtml }]);
    }, delay);

  }, [input, typing, nameCollected, userName]);

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const reset = () => {
    sessionStorage.removeItem("bv_userName");
    setMsgs([ASK_NAME_MSG]);
    setInput("");
    setTyping(false);
    setNameCollected(false);
    setUserName("");
    replyCount = 0;
    pendingRef.current = false;
  };

  // ── Theme tokens ───────────────────────────────────────────────────────────
  const T = {
    popup:        dark ? "#1E293B" : "#ffffff",
    border:       dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    msgArea:      dark ? "#1E293B" : "#ffffff",
    botBubble:    dark ? "#2D3748" : "#F1F5F9",
    botText:      dark ? "#E2E8F0" : "#1E293B",
    userText:     "#ffffff",
    inputBg:      dark ? "#0F172A" : "#F8FAFC",
    inputBorder:  dark ? "#334155" : "#E2E8F0",
    inputText:    dark ? "#E2E8F0" : "#1E293B",
    footerBg:     dark ? "#0F172A" : "#F8FAFC",
    footerBorder: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    chipBorder:   dark ? "rgba(255,122,0,0.3)" : "rgba(255,122,0,0.25)",
    chipsBg:      dark ? "#1E293B" : "#ffffff",
    toggleBg:     dark ? "#2D3748" : "#F1F5F9",
    toggleColor:  dark ? "#94A3B8" : "#6B7280",
  };

  const QUICK = ["Services", "ABA Therapy", "Free Consult", "Contact", "Career"];

  return (
    <>
      {/* ── Floating Button ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 998,
          width: 52, height: 52, borderRadius: "50%",
          background: open
            ? (dark ? "#334155" : "#64748B")
            : "linear-gradient(135deg,#FF7A00,#E91E63)",
          boxShadow: open ? "0 4px 16px rgba(0,0,0,0.25)" : "0 6px 24px rgba(255,122,0,0.45)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          transform: open ? "rotate(90deg) scale(0.92)" : "scale(1)",
        }}
      >
        {open ? <X size={20} strokeWidth={2.5} /> : <MessageCircle size={20} strokeWidth={2} />}
      </button>

      {/* ── Chat Popup ──────────────────────────────────────────────────────── */}
      {open && (
        <div className="chat-popup" style={{
          position: "fixed", bottom: "10.5rem", right: "1.5rem", zIndex: 997,
          width: "min(368px, calc(100vw - 2rem))",
          height: "min(540px, calc(100vh - 13rem))",
          borderRadius: 20,
          background: T.popup,
          boxShadow: dark ? "0 24px 64px rgba(0,0,0,0.5)" : "0 24px 64px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: `1px solid ${T.border}`,
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg,#FF7A00,#E91E63)",
            padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Bot size={18} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2, margin: 0 }}>
                Vera
                {userName && (
                  <span style={{ fontWeight: 400, fontSize: 12, marginLeft: 6, opacity: 0.85 }}>
                    · Hi {userName}!
                  </span>
                )}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#4ADE80",
                  display: "inline-block", boxShadow: "0 0 6px #4ADE80",
                }} />
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, margin: 0 }}>
                  Bloomvera Assistant · Online
                </p>
              </div>
            </div>
            <button onClick={reset} title="Reset conversation" style={{
              background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8,
              width: 28, height: 28, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <RotateCcw size={13} strokeWidth={2.5} />
            </button>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8,
              width: 28, height: 28, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "16px 14px 8px",
            display: "flex", flexDirection: "column", gap: 12,
            background: T.msgArea,
          }}>
            {msgs.map((m) => (
              <div key={m.id} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end", gap: 8,
              }}>
                {m.role === "bot" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 2,
                  }}>
                    <Bot size={13} color="#fff" strokeWidth={2} />
                  </div>
                )}
                <div style={{
                  maxWidth: "78%", padding: "10px 13px",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user"
                    ? "linear-gradient(135deg,#FF7A00,#E91E63)"
                    : T.botBubble,
                  color: m.role === "user" ? T.userText : T.botText,
                  fontSize: 13, lineHeight: 1.65,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                }}
                  dangerouslySetInnerHTML={{ __html: m.html ?? m.text }}
                />
                {m.role === "user" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: dark ? "#334155" : "#E2E8F0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 2,
                  }}>
                    <User size={13} color={dark ? "#94A3B8" : "#64748B"} strokeWidth={2} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF7A00,#E91E63)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Bot size={13} color="#fff" strokeWidth={2} />
                </div>
                <div style={{
                  padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
                  background: T.botBubble, display: "flex", gap: 4, alignItems: "center",
                }}>
                  {[0, 1, 2].map(n => (
                    <span key={n} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#FF7A00",
                      display: "inline-block",
                      animation: `chatDot 1.2s infinite ${n * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Quick Chips with Toggle ──────────────────────────────────────── */}
          {nameCollected && (
            <div style={{ background: T.chipsBg, flexShrink: 0 }}>
              {/* Toggle bar */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 14px 0",
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: T.toggleColor, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Quick Actions
                </span>
                <button
                  onClick={() => setChipsOpen(o => !o)}
                  style={{
                    background: T.toggleBg, border: "none", borderRadius: 6,
                    padding: "3px 8px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 3,
                    color: T.toggleColor, fontSize: 11, fontFamily: "inherit",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {chipsOpen
                    ? <><ChevronDown size={12} strokeWidth={2.5} /> Hide</>
                    : <><ChevronUp size={12} strokeWidth={2.5} /> Show</>}
                </button>
              </div>

              {/* Chips */}
              <div style={{
                overflow: "hidden",
                maxHeight: chipsOpen ? "60px" : "0px",
                transition: "max-height 0.28s cubic-bezier(0.22,1,0.36,1)",
                padding: chipsOpen ? "6px 14px 8px" : "0 14px",
                display: "flex", gap: 6, flexWrap: "wrap",
              }}>
                {QUICK.map(s => (
                  <button key={s}
                    onClick={() => {
                      setInput(s);
                      setChipsOpen(false);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    style={{
                      padding: "4px 10px", borderRadius: 20,
                      border: `1px solid ${T.chipBorder}`,
                      background: "rgba(255,122,0,0.06)",
                      color: "#FF7A00", fontSize: 11, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "background 0.15s", whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,122,0,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,122,0,0.06)"}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "10px 12px 12px", background: T.footerBg,
            borderTop: `1px solid ${T.footerBorder}`,
            display: "flex", gap: 8, alignItems: "center", flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={nameCollected ? "Ask me anything…" : "Type your name…"}
              disabled={typing}
              style={{
                flex: 1, padding: "9px 13px", borderRadius: 12,
                border: `1.5px solid ${T.inputBorder}`,
                background: T.inputBg, color: T.inputText,
                fontSize: 13, outline: "none", fontFamily: "inherit",
                transition: "border-color 0.2s",
                opacity: typing ? 0.7 : 1,
              }}
              onFocus={e => e.target.style.borderColor = "#FF7A00"}
              onBlur={e => e.target.style.borderColor = T.inputBorder}
            />
            <button
              onClick={send}
              disabled={!input.trim() || typing}
              style={{
                width: 38, height: 38, borderRadius: 11, border: "none", flexShrink: 0,
                cursor: (input.trim() && !typing) ? "pointer" : "not-allowed",
                background: (input.trim() && !typing)
                  ? "linear-gradient(135deg,#FF7A00,#E91E63)"
                  : (dark ? "#334155" : "#E2E8F0"),
                display: "flex", alignItems: "center", justifyContent: "center",
                color: (input.trim() && !typing) ? "#fff" : (dark ? "#64748B" : "#94A3B8"),
                transition: "all 0.2s",
                boxShadow: (input.trim() && !typing) ? "0 4px 12px rgba(255,122,0,0.3)" : "none",
              }}
            >
              <Send size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}