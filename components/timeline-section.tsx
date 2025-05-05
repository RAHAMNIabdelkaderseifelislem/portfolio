"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Code, Rocket, Trophy, Lightbulb } from "lucide-react"

const TimelineSection = () => {
  const timelineItems = [
    {
      year: "2017",
      title: "Hobby Game Modding & Development",
      description: "Learned Lua and some basic C++ through game modding (Pro Evolution Soccer)",
      icon: <Code className="h-5 w-5 text-cloud-white" />,
      color: "bg-accent-red",
    },
    {
      year: "2022",
      title: "BSc in Information Systems and Software Engineering – University of Saida",
      description: "Graduated with honors, focusing on information systems and software development",
      icon: <BookOpen className="h-5 w-5 text-cloud-white" />,
      color: "bg-vibrant-teal",
    },
    {
      year: "2024",
      title: "MSc in Computer Modeling of Knowledge & Reasoning – University of Saida",
      description: "Researching AI models for knowledge representation and reasoning systems",
      icon: <Award className="h-5 w-5 text-cloud-white" />,
      color: "bg-neural-gold",
    },
    {
      year: "2024",
      title: "National Hackathon Wins",
      description: "Second place with AgriChat and Plant Disease Detection projects",
      icon: <Trophy className="h-5 w-5 text-cloud-white" />,
      color: "bg-accent-red",
    },
    {
      year: "2024",
      title: "Selected for Huawei Seeds for the Future Program",
      description: "Recognized for innovation ,technical and academic excellence",
      icon: <Lightbulb className="h-5 w-5 text-cloud-white" />,
      color: "bg-vibrant-teal",
    },
    {
      year: "2024",
      title: "Started PhD in Artificial Intelligence",
      description: "Research focus on bridging symbolic AI and deep learning",
      icon: <BookOpen className="h-5 w-5 text-cloud-white" />,
      color: "bg-neural-gold",
    },
    {
      year: "2025",
      title: "AI Agent Planner & CV Builder Development",
      description: "Working on advanced AI tools for business and career planning",
      icon: <Code className="h-5 w-5 text-cloud-white" />,
      color: "bg-accent-red",
    },
  ]

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-deep-indigo/95 to-deep-indigo/90 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Project Journey Timeline</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Charting the path of my academic and professional development
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="timeline-item"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${item.color} flex-shrink-0`}>{item.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold px-2 py-1 rounded-full bg-deep-indigo/70 text-neural-gold border border-neural-gold/30">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-cloud-white">{item.title}</h3>
                  </div>
                  <p className="text-cloud-white/70">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-full bg-vibrant-teal/20 border border-vibrant-teal/30">
              <span className="text-vibrant-teal font-medium">
                Future Endeavors: International Research Collaborations & AI Startups
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
