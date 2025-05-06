"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const FloatingContactButton = () => {
  const [visible, setVisible] = useState(false)

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Show button after scrolling down 30% of viewport height
      if (scrollY > viewportHeight * 0.3) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={scrollToContact}
            className="rounded-full bg-vibrant-teal hover:bg-vibrant-teal/90 text-cloud-white shadow-lg group"
            size="lg"
            aria-label="Get in touch"
          >
            <MessageSquare className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            <span className="font-medium">Get in Touch</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingContactButton
