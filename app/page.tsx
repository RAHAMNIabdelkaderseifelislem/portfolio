import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ResearchSection from "@/components/research-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import AgentWorkshopSection from "@/components/agent-workshop-section"
import TimelineSection from "@/components/timeline-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex flex-col w-full">
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
        <SkillsSection />
        <AgentWorkshopSection />
        <TimelineSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </>
  )
}
