"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Cpu, Database, MessageSquare, Network } from "lucide-react"

const AgentWorkshopSection = () => {
  return (
    <section id="agent-workshop" className="py-20 bg-gradient-to-b from-deep-indigo/90 to-deep-indigo/95 relative">
      <div className="neural-lines"></div>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">AI Agent Workshop</h2>
          <p className="text-cloud-white/80 max-w-3xl mx-auto">
            Designing and implementing intelligent AI agents for specialized tasks
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
            <div>
              <h3 className="text-2xl font-semibold text-cloud-white mb-4">Agent Architecture & Design</h3>
              <p className="text-cloud-white/80">
                I specialize in building modular AI agents using LangChain, RAG (Retrieval-Augmented Generation), and
                MoE (Mixture of Experts) approaches. My agents are designed to handle complex tasks through a
                combination of specialized knowledge, reasoning capabilities, and dynamic tool usage.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cloud-white mb-4">Key Agent Components</h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: <Database className="h-5 w-5 text-vibrant-teal" />,
                    title: "Knowledge Retrieval",
                    description: "Vector databases and semantic search for context-aware responses",
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5 text-neural-gold" />,
                    title: "Prompt Engineering",
                    description: "Carefully crafted prompts with dynamic input injection for consistent outputs",
                  },
                  {
                    icon: <Network className="h-5 w-5 text-accent-red" />,
                    title: "Agent Memory",
                    description: "Short and long-term memory systems for contextual awareness and learning",
                  },
                  {
                    icon: <Cpu className="h-5 w-5 text-accent-lavender" />,
                    title: "Tool Integration",
                    description: "Function-calling capabilities to leverage external tools and APIs",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-deep-indigo/50 border border-accent-lavender/20"
                  >
                    <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-cloud-white">{item.title}</h4>
                      <p className="text-sm text-cloud-white/70">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-deep-indigo/50 border border-accent-lavender/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-deep-indigo/80 border border-accent-lavender/30">
                    <Bot className="h-6 w-6 text-vibrant-teal" />
                  </div>
                  <CardTitle className="text-xl text-cloud-white">Agent Implementation Examples</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "AgriChat Expert System",
                      description: "Agricultural chatbot with domain-specific knowledge and reasoning",
                      code: `from langchain.agents import initialize_agent, Tool
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone

# Initialize retrieval system
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_existing_index(
    index_name="agricultural-data", 
    embedding=embeddings
)
retriever = vectorstore.as_retriever()

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0),
    chain_type="stuff",
    retriever=retriever
)

# Define tools
tools = [
    Tool(
        name="Agricultural Knowledge Base",
        func=qa_chain.run,
        description="Useful for answering questions about plant diseases, treatments, and farming practices."
    )
]

# Initialize agent
agent = initialize_agent(
    tools, 
    ChatOpenAI(temperature=0.2), 
    agent="chat-conversational-react-description",
    verbose=True
)`,
                    },
                    {
                      title: "Business Plan Generator",
                      description: "Agent that creates business plans based on project ideas and team skills",
                      code: `from langchain.agents import AgentExecutor, create_react_agent
from langchain.prompts import PromptTemplate
from langchain.tools import Tool
from langchain.chat_models import ChatOpenAI

# Define tools
market_research_tool = Tool(
    name="MarketResearch",
    func=lambda query: "Market size: $2.5B, Growth: 12% YoY, Competitors: 3 major players",
    description="Researches market conditions for a business idea"
)

financial_projection_tool = Tool(
    name="FinancialProjection",
    func=lambda query: "Year 1: $250K revenue, Year 2: $750K revenue, Year 3: $1.5M revenue",
    description="Creates financial projections for a business plan"
)

# Create prompt template
prompt = PromptTemplate.from_template(
    """You are an expert business consultant.
    
    Project Idea: {idea}
    Team Skills: {skills}
    
    Create a comprehensive business plan including:
    1. Executive Summary
    2. Market Analysis
    3. Organization Structure
    4. Financial Projections
    
    Use the tools available to research and provide accurate information.
    """
)

# Create agent
llm = ChatOpenAI(temperature=0.7)
agent = create_react_agent(llm, [market_research_tool, financial_projection_tool], prompt)
agent_executor = AgentExecutor(agent=agent, tools=[market_research_tool, financial_projection_tool], verbose=True)`,
                    },
                  ].map((example, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-vibrant-teal"></div>
                        <h4 className="text-lg font-medium text-vibrant-teal">{example.title}</h4>
                      </div>
                      <p className="text-sm text-cloud-white/70 mb-2">{example.description}</p>
                      <div className="bg-slate-black/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-cloud-white/90 font-mono">
                          <code>{example.code}</code>
                        </pre>
                      </div>
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

export default AgentWorkshopSection
