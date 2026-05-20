import React from "react";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import MissionVision from "../components/sections/MissionVision";
import ImageSlideshow from "../components/sections/ImageSlideshow";
import CTASection from "../components/sections/CTASection";
import FAQAccordion from "../components/ui/FAQAccordion";
import SectionHeading from "../components/ui/SectionHeading";

const faqs = [
  { q:"What is ABA Therapy and is it right for my child?", a:"Applied Behavior Analysis (ABA) is one of the most researched, effective therapies for autism. It builds communication, social, and daily living skills through structured positive reinforcement. We assess every child individually before recommending a program." },
  { q:"How do I know which program is best for my child?", a:"We start every family with a free consultation. Our clinical team reviews your child's needs, strengths, and goals — then recommends the right combination of services, with no obligation." },
  { q:"Do you offer home-based therapy?", a:"Yes. Our Home-Based Autism Support brings certified therapists directly to your home, where children often make faster progress in familiar surroundings." },
  { q:"What age groups do you work with?", a:"We support children from toddlers through teenagers. Early intervention is especially impactful, but it's never too late to begin a therapy program." },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <MissionVision />
      <ImageSlideshow />

      {/* FAQ teaser */}
      <section className="section-py" style={{ background:"#F9FAFB" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeading
            tag="Common Questions"
            title="Answers to Your"
            highlight="Questions"
            subtitle="Clear, honest answers to what families ask us most. More questions? We're always happy to talk."
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
