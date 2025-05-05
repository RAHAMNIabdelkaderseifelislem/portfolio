"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Github, Linkedin, Mail, MapPin, Phone, FileCode } from "lucide-react"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    // Show success message
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-deep-indigo/90 to-deep-indigo relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Contact & Collaboration</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Let's connect and explore opportunities to work together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-cloud-white mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30 mt-1">
                      <Mail className="h-5 w-5 text-vibrant-teal" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-cloud-white">Email</h4>
                      <p className="text-cloud-white/70">a.e.k426rahmani@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30 mt-1">
                      <Phone className="h-5 w-5 text-neural-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-cloud-white">Phone</h4>
                      <p className="text-cloud-white/70">+213 668 704 202</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30 mt-1">
                      <MapPin className="h-5 w-5 text-accent-red" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-cloud-white">Location</h4>
                      <p className="text-cloud-white/70">Saida, Algeria</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-cloud-white mb-4">Connect With Me</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-accent-lavender/30 text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                      asChild
                    >
                      <a href="https://github.com/RAHAMNIabdelkaderseifelislem/" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-accent-lavender/30 text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                      asChild
                    >
                      <a href="https://www.linkedin.com/in/aek-seif-el-islem-rahmani/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-accent-lavender/30 text-cloud-white hover:text-vibrant-teal hover:bg-deep-indigo/50"
                      asChild
                    >
                      <a href="https://kaggle.com/aek426rahmani" target="_blank" rel="noopener noreferrer">
                        <FileCode className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-neural-gold hover:bg-neural-gold/80 text-slate-black">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-cloud-white mb-6">Send Me a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-cloud-white">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-deep-indigo/70 border-accent-lavender/30 text-cloud-white placeholder:text-cloud-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-cloud-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="bg-deep-indigo/70 border-accent-lavender/30 text-cloud-white placeholder:text-cloud-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-cloud-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      required
                      className="bg-deep-indigo/70 border-accent-lavender/30 text-cloud-white placeholder:text-cloud-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-cloud-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      className="min-h-[150px] bg-deep-indigo/70 border-accent-lavender/30 text-cloud-white placeholder:text-cloud-white/50"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-vibrant-teal hover:bg-vibrant-teal/80 text-cloud-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
