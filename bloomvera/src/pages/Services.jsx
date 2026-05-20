import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Users, Sparkles, Home, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import CTASection from "../components/sections/CTASection";

const services = [
  {
    id:"aba", icon:Brain, title:"ABA Therapy", full:"Applied Behavior Analysis",
    tagline:"Scientifically proven. Deeply personalized.",
    image:"/aba-therapy.jpg", color:"#FF7A00",
    gradient:"linear-gradient(135deg,#FF7A00,#E91E63)",
    desc:"The gold-standard evidence-based approach for autism. Our certified BCBAs design individualized programs using positive reinforcement to build communication, social, and daily living skills.",
    benefits:["Improves communication and language","Builds social and emotional skills","Reduces challenging behaviors","Develops academic readiness","Increases daily living independence"],
    process:[
      {step:"Assessment",   desc:"Comprehensive evaluation of strengths, needs, and goals."},
      {step:"Program Design",desc:"Custom ABA plan by a Board Certified Behavior Analyst."},
      {step:"Therapy",       desc:"Consistent sessions with skilled therapists."},
      {step:"Progress Review",desc:"Ongoing data tracking and program updates."},
    ],
  },
  {
    id:"social", icon:Users, title:"Social Skills Groups", full:"Peer Interaction Programs",
    tagline:"Building connections, one friendship at a time.",
    image:"/social-skills.webp", color:"#00A651",
    gradient:"linear-gradient(135deg,#00A651,#007D3D)",
    desc:"Safe, therapist-guided group sessions where children practice conversation, emotional regulation, and real-world social scenarios that lead to genuine friendships.",
    benefits:["Practice real social scenarios","Develop conversational skills","Learn emotional regulation","Build group confidence","Form genuine friendships"],
    process:[
      {step:"Grouping",     desc:"Children matched by age and social skill level."},
      {step:"Curriculum",   desc:"Structured weekly targets for social competencies."},
      {step:"Guided Practice",desc:"Role-play, games, and collaborative activities."},
      {step:"Home Extension",desc:"Parent coaching to reinforce skills at home."},
    ],
  },
  {
    id:"daily", icon:Sparkles, title:"Daily Living Skills", full:"Independence Training",
    tagline:"Empowering children to navigate everyday life.",
    image:"/daily-skills.jpeg", color:"#E91E63",
    gradient:"linear-gradient(135deg,#E91E63,#FF7A00)",
    desc:"Step-by-step training for self-care, hygiene, meal preparation, and community navigation — building the practical skills children need for true independence.",
    benefits:["Personal hygiene routines","Dressing and self-care","Meal preparation safety","Home organization skills","Community navigation"],
    process:[
      {step:"Skills Assessment",desc:"Identify current levels and priority areas."},
      {step:"Task Analysis",    desc:"Break each skill into achievable steps."},
      {step:"Hands-On Practice",desc:"Real-world practice in home and community."},
      {step:"Fading Support",   desc:"Gradually reduce prompts to build independence."},
    ],
  },
  {
    id:"home", icon:Home, title:"Home-Based Support", full:"In-Home Autism Care",
    tagline:"Expert care in the place your child feels safest.",
    image:"/home-support.jpg", color:"#FF7A00",
    gradient:"linear-gradient(135deg,#FF7A00,#00A651)",
    desc:"Our therapists come to your home, addressing challenges as they naturally occur — while actively coaching your family to reinforce learning throughout every day.",
    benefits:["Therapy in familiar surroundings","Real-life skill generalization","Active family coaching","Flexible scheduling","Immediate skill application"],
    process:[
      {step:"Home Visit",    desc:"Initial assessment of environment and goals."},
      {step:"Scheduling",    desc:"Flexible sessions fitting your family life."},
      {step:"In-Home Therapy",desc:"Expert therapists work directly with your child."},
      {step:"Family Coaching",desc:"Train caregivers to reinforce skills daily."},
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState("aba");
  const s = services.find(x => x.id === active);
  const Icon = s.icon;

  return (
    <>
      <PageHero
        tag="Our Programs"
        title="Services Built Around"
        highlight="Your Child"
        subtitle="Every program designed around one goal — helping your child grow, thrive, and reach their full potential."
        image="/service.jpg"
      />

      <section className="section-py bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {services.map(sv => {
              const SI = sv.icon;
              const isA = sv.id === active;
              return (
                <motion.button key={sv.id} onClick={() => setActive(sv.id)} whileTap={{scale:0.97}}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold text-sm transition-all duration-200"
                  style={isA
                    ? { background: sv.gradient, color: "#fff", boxShadow: `0 4px 18px ${sv.color}40` }
                    : { background: "#F3F4F6", color: "#6B7280" }
                  }>
                  <SI size={15} strokeWidth={2} />
                  {sv.title}
                </motion.button>
              );
            })}
          </div>

          {/* Content */}
          <motion.div key={active} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}>
            <div className="grid lg:grid-cols-2 gap-10 mb-12 items-start">
              {/* Image + description */}
              <div>
                <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-card mb-6">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover"
                    onError={e => { e.target.parentElement.style.background=`${s.color}10`; e.target.style.display="none"; }} />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4" style={{background:`${s.color}12`}}>
                  <Icon size={14} style={{color:s.color}} strokeWidth={2} />
                  <span className="text-xs font-sans font-semibold" style={{color:s.color}}>{s.full}</span>
                </div>
                <h2 className="font-sans font-bold text-dark text-2xl sm:text-3xl tracking-tight mb-2">{s.title}</h2>
                <p className="font-sans text-sm italic mb-4" style={{color:s.color}}>{s.tagline}</p>
                <p className="text-muted text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link to="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-sans font-semibold text-sm rounded-xl hover:-translate-y-0.5 transition-all"
                  style={{background:s.gradient,boxShadow:`0 4px 18px ${s.color}35`}}>
                  Get Started <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl p-6 border border-gray-100" style={{background:`${s.color}06`}}>
                <h3 className="font-sans font-semibold text-dark text-sm mb-5">Key Benefits</h3>
                <ul className="space-y-3">
                  {s.benefits.map(b => (
                    <motion.li key={b} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{duration:0.3}}
                      className="flex items-start gap-3">
                      <CheckCircle2 size={16} style={{color:s.color}} className="shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-mid text-sm">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Process */}
            <div>
              <h3 className="font-sans font-bold text-dark text-xl tracking-tight text-center mb-6">Our Process</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {s.process.map((p, i) => (
                  <motion.div key={p.step} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-card relative overflow-hidden">
                    <div className="w-1 h-8 rounded-full mb-3" style={{background:s.gradient}} />
                    <span className="absolute top-3 right-3 font-sans font-bold text-5xl leading-none select-none" style={{color:s.color,opacity:0.07}}>{i+1}</span>
                    <h4 className="font-sans font-semibold text-dark text-sm mb-1.5">{p.step}</h4>
                    <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
