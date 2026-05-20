import React from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import CTASection from "../components/sections/CTASection";
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedWrapper";

const values = [
  { icon:Heart,         label:"Compassion",   desc:"Every interaction guided by genuine care for the children and families we serve.", color:"#E91E63" },
  { icon:Award,         label:"Excellence",   desc:"We hold ourselves to the highest clinical standards in every program we deliver.", color:"#FF7A00" },
  { icon:Users,         label:"Collaboration",desc:"We partner with families as true teammates in each child's development journey.", color:"#00A651" },
  { icon:BookOpen,      label:"Evidence",     desc:"All programs grounded in peer-reviewed research and clinical best practices.", color:"#FF7A00" },
];

 

export default function About() {
  return (
    <>
      <PageHero
        tag="Who We Are"
        title="A Team That"
        highlight="Truly Cares"
        subtitle="More than therapists — we're advocates, partners, and believers in the limitless potential of every child on the autism spectrum."
        image="/about-1.jpg"
      />

      {/* Story + image */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}>
              <div className="rounded-3xl overflow-hidden aspect-video bg-gray-100 shadow-card-hover">
                <img src="/hero-2.webp" alt="Our team" className="w-full h-full object-cover"
                  onError={e => { e.target.parentElement.style.background="#f3f4f6"; e.target.style.display="none"; }} />
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1,ease:[0.22,1,0.36,1]}}>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-6 bg-orange-500" />
                <span className="text-orange-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">Our Story</span>
              </div>
              <h2 className="font-sans font-bold text-dark tracking-tight mb-5"
                style={{fontSize:"clamp(1.7rem,3vw,2.4rem)",letterSpacing:"-0.02em"}}>
                Built on Belief in Every Child's Potential
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                Bloomvera Autism was founded by a team of dedicated clinicians and family advocates who recognized a critical need — autism care that is both clinically rigorous and deeply human.
              </p>
              <p className="text-muted text-base leading-relaxed">
                We believe that with the right support, every autistic child can develop skills, build confidence, and thrive — in their own unique way, at their own pace.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-6 bg-green-500" />
                <span className="text-green-500 font-sans font-semibold text-xs tracking-[0.18em] uppercase">Our Approach</span>
              </div>
              <h2 className="font-sans font-bold text-dark tracking-tight mb-5"
                style={{fontSize:"clamp(1.7rem,3vw,2.4rem)",letterSpacing:"-0.02em"}}>
                Where Science and Compassion Meet
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                We integrate evidence-based techniques with a genuine commitment to the wellbeing of each child and family. Our therapists aren't just clinicians — they are dedicated partners in your journey.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Every program is tailored to the individual. No two children are the same, and neither are their care plans.
              </p>
            </motion.div>
            <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1,ease:[0.22,1,0.36,1]}} className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden aspect-video bg-gray-100 shadow-card-hover">
                <img src="/evidence-based.jpg" alt="Our approach" className="w-full h-full object-cover"
                  onError={e => { e.target.parentElement.style.background="#f0fbf5"; e.target.style.display="none"; }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py" style={{background:"#F9FAFB"}}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading tag="What Guides Us" title="Our Core" highlight="Values" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.label}>
                  <motion.div whileHover={{y:-5}} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all text-center h-full flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{background:`${v.color}14`}}>
                      <Icon size={22} style={{color:v.color}} strokeWidth={2} />
                    </div>
                    <h3 className="font-sans font-bold text-dark text-sm mb-2">{v.label}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

     

      <CTASection />
    </>
  );
}
