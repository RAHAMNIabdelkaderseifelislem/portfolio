"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, FileCode } from "lucide-react"
import { motion } from "framer-motion"

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Neural network nodes and connections
    const nodes: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
    const numNodes = Math.min(Math.floor(window.innerWidth / 20), 100)

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(125, 130, 184, 0.5)"
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(125, 130, 184, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      <div className="neural-lines" aria-hidden="true"></div>

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cloud-white leading-tight">
                Neural Nexus
              </h1>
              <p className="text-xl md:text-2xl text-vibrant-teal font-medium">
                Where AI Research Meets Real-World Innovation
              </p>
            </div>

            <p className="text-lg text-cloud-white/80">
              AbdElKader Seif El Islem RAHMANI • PhD Researcher • Deep Learning Engineer • Full-Stack AI Innovator
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  const aboutSection = document.getElementById("about")
                  if (aboutSection) {
                    window.scrollTo({
                      top: aboutSection.offsetTop - 80,
                      behavior: "smooth",
                    })
                  }
                }}
                className="bg-vibrant-teal hover:bg-vibrant-teal/80 text-cloud-white"
                aria-label="Explore my work"
              >
                Explore My Work
              </Button>

              <Button
                variant="outline"
                className="border-accent-lavender text-cloud-white hover:bg-accent-lavender/20"
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.offsetTop - 80,
                      behavior: "smooth",
                    })
                  }
                }}
                aria-label="Get in touch"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                asChild
                aria-label="GitHub profile"
              >
                <a href="https://github.com/RAHAMNIabdelkaderseifelislem/" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                asChild
                aria-label="LinkedIn profile"
              >
                <a href="https://www.linkedin.com/in/aek-seif-el-islem-rahmani/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                asChild
                aria-label="Kaggle profile"
              >
                <a href="https://kaggle.com/aek426rahmani" target="_blank" rel="noopener noreferrer">
                  <FileCode size={20} />
                  <span className="sr-only">Kaggle</span>
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 hexagon bg-deep-indigo border-2 border-vibrant-teal/30 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant-teal/20 to-accent-lavender/20"></div>
              <img
                src="/profile.png?height=400&width=400"
                alt="AbdElKader Seif El Islem RAHMANI - AI Researcher and Developer"
                className="w-full h-full object-cover opacity-90"
                width={400}
                height={400}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/80 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-cloud-white hover:text-vibrant-teal hover:bg-transparent"
            onClick={() => {
              const aboutSection = document.getElementById("about")
              if (aboutSection) {
                window.scrollTo({
                  top: aboutSection.offsetTop - 80,
                  behavior: "smooth",
                })
              }
            }}
            aria-label="Scroll to About section"
          >
            <ArrowDown size={24} />
            <span className="sr-only">Scroll down</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
