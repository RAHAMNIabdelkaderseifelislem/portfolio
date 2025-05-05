"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Database, Lightbulb } from "lucide-react"

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 bg-gradient-to-b from-deep-indigo/95 to-deep-indigo/90 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Research & Innovation Hub</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Exploring the frontiers of AI through academic research and practical applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20 h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                    <Brain className="h-6 w-6 text-neural-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-cloud-white">PhD Research</CardTitle>
                    <CardDescription className="text-cloud-white/70">
                      University Centre of Naama – Salhi Ahmed (In Progress)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-semibold text-vibrant-teal mb-3">
                  Bridging symbolic AI and deep learning approaches for intelligent reasoning systems
                </h4>
                <ul className="space-y-2 text-cloud-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Exploring hybrid models combining symbolic logic with neural reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Application in autonomous decision-making agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Goal: Build systems that reason, not just recognize</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Tools: Python, Prolog, TensorFlow, Transformers, Knowledge Graphs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20 h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                    <Database className="h-6 w-6 text-vibrant-teal" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-cloud-white">MSc Research</CardTitle>
                    <CardDescription className="text-cloud-white/70">
                      University of Saida Dr. Moulay Tahar
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-semibold text-vibrant-teal mb-3">
                  Knowledge Modeling and Automated Reasoning in Smart Environments
                </h4>
                <ul className="space-y-2 text-cloud-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Focus on knowledge representation using ontologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Built inference engines for semantic decision-making</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Combined rule-based systems with real-time data sensors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-gold">•</span>
                    <span>Resulted in a functional AI pipeline for smart automation scenarios</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-2"
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                    <Lightbulb className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-cloud-white">Research Interests</CardTitle>
                    <CardDescription className="text-cloud-white/70">Areas of focus and exploration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Neuro-Symbolic AI",
                      description: "Combining neural networks with symbolic reasoning for more robust AI systems",
                    },
                    {
                      title: "Knowledge Representation",
                      description: "Developing ontologies and knowledge graphs for structured information",
                    },
                    {
                      title: "Agent Architecture",
                      description: "Designing autonomous agents with reasoning and planning capabilities",
                    },
                    {
                      title: "Natural Language Processing",
                      description: "Advancing language understanding and generation for specialized domains",
                    },
                    {
                      title: "Explainable AI",
                      description: "Creating AI systems that can explain their reasoning and decisions",
                    },
                    {
                      title: "Applied Deep Learning",
                      description: "Implementing deep learning solutions for real-world problems",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-deep-indigo/70 border border-accent-lavender/10">
                      <h4 className="text-lg font-semibold text-vibrant-teal mb-2">{item.title}</h4>
                      <p className="text-sm text-cloud-white/80">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ResearchSection
