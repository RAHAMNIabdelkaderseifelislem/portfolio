"use client"

import { motion } from "framer-motion"
import { Brain, Code, Lightbulb, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const AboutSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-deep-indigo to-deep-indigo/95 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">About Me</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Bridging the gap between theoretical AI research and practical applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-cloud-white/90">
              I'm <span className="text-vibrant-teal font-semibold">AbdElKader Seif El Islem RAHMANI</span>, currently
              pursuing a PhD in Artificial Intelligence at the University Centre of Naama – Salhi Ahmed, where I
              specialize in bridging the gap between theoretical models and practical AI deployments.
            </p>

            <p className="text-lg text-cloud-white/90">
              My passion lies at the intersection of academic research and applied innovation. I translate cutting-edge
              AI theories into actionable systems — from chatbot agents and reasoning systems to real-time detection
              pipelines and scalable backend architectures.
            </p>

            <p className="text-lg text-cloud-white/90">
              Driven, collaborative, and always exploring, I work at the bleeding edge of deep learning, symbolic
              reasoning, agent architecture, and cloud-native deployment. Whether it's deploying microservices or
              debugging a transformer model, I balance academic depth with startup agility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Brain className="h-8 w-8 text-neural-gold" />,
                title: "AI Research",
                description:
                  "Exploring the intersection of symbolic AI and deep learning for intelligent reasoning systems",
                delay: 1,
              },
              {
                icon: <Code className="h-8 w-8 text-vibrant-teal" />,
                title: "Full-Stack Development",
                description: "Building end-to-end AI solutions from backend infrastructure to intuitive interfaces",
                delay: 2,
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-accent-red" />,
                title: "Innovation",
                description: "Creating novel approaches to solve complex problems with AI and machine learning",
                delay: 3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={item.delay}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="bg-deep-indigo/50 border border-accent-lavender/20 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-cloud-white mb-2">{item.title}</h3>
                    <p className="text-cloud-white/70 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
