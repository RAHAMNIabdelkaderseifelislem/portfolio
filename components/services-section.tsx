"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Brain, Code, MessageSquare, Eye, Lightbulb, ExternalLink } from "lucide-react"

const ServicesSection = () => {
  // Function to create WhatsApp link with custom message
  const createWhatsAppLink = (message: string) => {
    // Replace with your actual phone number in international format (no symbols)
    const phoneNumber = "213668704202" // Example: +213 123 456 789
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  }

  const services = [
    {
      icon: <Bot className="h-10 w-10 text-vibrant-teal" />,
      title: "AI Agent Development",
      description:
        "Custom AI agents built with LangChain, RAG, and MoE approaches for specialized tasks and domain-specific applications.",
      tags: ["LangChain", "RAG", "Prompt Engineering", "Function Calling"],
      message:
        "Hi Seif El Islem, I'm interested in your AI Agent Development service. I'd like to discuss a potential project.",
    },
    {
      icon: <Brain className="h-10 w-10 text-neural-gold" />,
      title: "Deep Learning Solutions",
      description:
        "End-to-end deep learning systems from data preparation to model deployment, optimized for performance and accuracy.",
      tags: ["TensorFlow", "PyTorch", "CNN", "Model Optimization"],
      message:
        "Hi Seif El Islem, I'm interested in your Deep Learning Solutions service. I'd like to discuss a potential project.",
    },
    {
      icon: <Eye className="h-10 w-10 text-accent-red" />,
      title: "Computer Vision Systems",
      description:
        "Advanced computer vision applications including object detection, image classification, and real-time video analysis.",
      tags: ["OpenCV", "Image Processing", "Object Detection", "Classification"],
      message:
        "Hi Seif El Islem, I'm interested in your Computer Vision Systems service. I'd like to discuss a potential project.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-accent-lavender" />,
      title: "NLP & Chatbot Development",
      description:
        "Intelligent conversational agents and natural language processing systems for specialized domains and use cases.",
      tags: ["Transformers", "BERT", "GPT Integration", "Custom Training"],
      message:
        "Hi Seif El Islem, I'm interested in your NLP & Chatbot Development service. I'd like to discuss a potential project.",
    },
    {
      icon: <Code className="h-10 w-10 text-vibrant-teal" />,
      title: "Full-Stack AI Applications",
      description:
        "Complete web and mobile applications with integrated AI capabilities, from frontend interfaces to backend systems.",
      tags: ["React", "Python", "API Development", "Cloud Deployment"],
      message:
        "Hi Seif El Islem, I'm interested in your Full-Stack AI Applications service. I'd like to discuss a potential project.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-neural-gold" />,
      title: "AI Research Consulting",
      description:
        "Expert guidance on AI research directions, methodology, and implementation for academic and industry projects.",
      tags: ["Literature Review", "Methodology Design", "Technical Writing", "Proof of Concept"],
      message:
        "Hi Seif El Islem, I'm interested in your AI Research Consulting service. I'd like to discuss a potential project.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-deep-indigo/90 to-deep-indigo/95 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Services</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Specialized AI and development services to bring your projects to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-deep-indigo/50 border border-accent-lavender/20 h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center text-cloud-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-cloud-white/80 text-center mb-4">{service.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="bg-deep-indigo/80 text-cloud-white/90 border-accent-lavender/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-2 pb-6">
                  <Button
                    asChild
                    className="bg-vibrant-teal hover:bg-vibrant-teal/80 text-cloud-white"
                    aria-label={`Contact about ${service.title} via WhatsApp`}
                  >
                    <a href={createWhatsAppLink(service.message)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Contact via WhatsApp
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
