"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Leaf, Fingerprint, LineChart, FileText, Lightbulb, Trophy } from "lucide-react"

const ProjectsSection = () => {
  const projects = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "AgriChat — Agricultural Expert Chatbot",
      description: "Intelligent chatbot that assists farmers with plant issues using LangChain, RAG, and MoE",
      achievement: "2nd Place Hackathon Winner",
      tags: ["LangChain", "OpenAI", "Pinecone", "Streamlit", "Firebase", "FastAPI"],
      color: "bg-vibrant-teal",
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Plant Disease Detection",
      description: "Deep learning system for early detection of plant diseases with 91% accuracy using fine-tuned CNNs",
      achievement: "2nd Place Hackathon Winner",
      tags: ["TensorFlow", "OpenCV", "Flask", "Google Colab", "Heroku"],
      color: "bg-neural-gold",
    },
    {
      icon: <Fingerprint className="h-5 w-5" />,
      title: "Fingerprint Recognition in Cloud",
      description: "Biometric identity verification system using image preprocessing and CNN classification",
      tags: ["Keras", "Firebase", "OpenCV", "REST API", "JS Frontend"],
      color: "bg-accent-lavender",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Orderbook Reconstruction (HFT)",
      description: "Java-based engine to reconstruct orderbooks from out-of-order incremental updates",
      tags: ["Java", "OOP", "Multithreading"],
      color: "bg-accent-red",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "AI CV Builder Platform",
      description: "AI-based CV generation from raw user input with ATS-compliant formatting",
      tags: ["Python", "OpenAI API", "LangChain", "React", "Gradio"],
      color: "bg-vibrant-teal",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "AI Business Plan Generator Agent",
      description: "AI agent that generates business plans, startup pitch scripts, and auto-assigns tasks",
      tags: ["LangChain", "GPT-4", "Pinecone", "Streamlit"],
      color: "bg-neural-gold",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-deep-indigo/90 to-deep-indigo/95 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Applied AI Projects Gallery</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Transforming theoretical concepts into practical solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card group"
            >
              <Card className="bg-transparent border-0 h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-full ${project.color} text-cloud-white`}>{project.icon}</div>
                    {project.achievement && (
                      <div className="flex items-center gap-1 bg-neural-gold/20 px-2 py-1 rounded-full">
                        <Trophy className="h-3 w-3 text-neural-gold" />
                        <span className="text-xs font-medium text-neural-gold">{project.achievement}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl text-cloud-white mt-3">{project.title}</CardTitle>
                  <CardDescription className="text-cloud-white/70">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tagIndex) => (
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
                <CardFooter>
                  <div className="w-full h-1 bg-deep-indigo/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${project.color} w-0 group-hover:w-full transition-all duration-1000`}
                    ></div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
