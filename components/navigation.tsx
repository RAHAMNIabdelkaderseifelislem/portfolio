"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const isMobile = useMobile()

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "agent-workshop", label: "AI Agents" },
    { id: "timeline", label: "Timeline" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-deep-indigo/80 border-b border-accent-lavender/20">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-vibrant-teal rounded-md flex items-center justify-center">
            <span className="text-cloud-white font-bold">NN</span>
          </div>
          <span className="font-bold text-xl text-cloud-white">Neural Nexus</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-vibrant-teal relative",
                activeSection === section.id ? "text-vibrant-teal" : "text-cloud-white/70",
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-vibrant-teal rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-cloud-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-deep-indigo border-b border-accent-lavender/20 p-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-vibrant-teal p-2 rounded-md",
                    activeSection === section.id ? "text-vibrant-teal bg-accent-lavender/10" : "text-cloud-white/70",
                  )}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation
