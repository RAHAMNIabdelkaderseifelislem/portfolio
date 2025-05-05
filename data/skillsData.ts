export interface SkillSubject {
    subject: string;
    proficiency: number; // Use a consistent key, e.g., 'proficiency' instead of 'A'
    fullMark?: number; // Keep if needed, but often implied as 100
  }
  
  export const aiSkillsData: SkillSubject[] = [
    { subject: "Deep Learning", proficiency: 90 },
    { subject: "Machine Learning", proficiency: 85 },
    { subject: "NLP", proficiency: 80 },
    { subject: "Agent Design", proficiency: 85 },
    { subject: "Ontologies", proficiency: 75 },
    { subject: "Data Mining", proficiency: 70 },
  ];
  
  export const programmingSkillsData: SkillSubject[] = [
    { subject: "Python", proficiency: 95 },
    { subject: "Java", proficiency: 80 },
    { subject: "JavaScript", proficiency: 75 },
    { subject: "PHP", proficiency: 80 },
    { subject: "SQL", proficiency: 95 },
    { subject: "API Dev", proficiency: 80 },
  ];
  
  export const webDevSkillsData: SkillSubject[] = [
    { subject: "Full-Stack", proficiency: 85 }, // Renamed for clarity
    { subject: "Backend", proficiency: 85 },
    { subject: "Frontend", proficiency: 75 },
    { subject: "DevOps/Cloud", proficiency: 80 }, // Grouped Hosting/Deployment
    { subject: "React", proficiency: 70 },
    { subject: "Frameworks", proficiency: 75 }, // Broader term
  ];
  
  export const toolCategories = [
    {
      icon: "Database", // Using string identifiers for dynamic import or mapping
      title: "Data & ML Tools",
      skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "HuggingFace"],
      color: "text-vibrant-teal", // Using theme color classes
      borderColor: "border-primary/30",
      bgColor:  "text-neural-gold",
    },
    {
      icon: "Server",
      title: "Backend & Infrastructure",
      skills: ["Flask", "FastAPI", "Laravel", "Node.js", "Firebase", "Heroku", "Vercel", "REST APIs", "SQL/NoSQL", "Docker"], // Added Docker
      color: "text-neural-gold",
      borderColor: "border-accent/30",
      bgColor: "bg-accent/10",
    },
    {
      icon: "Cpu",
      title: "AI Agent & Dev Tools", // Renamed slightly
      skills: ["LangChain", "RAG", "MoE", "Prompt Eng.", "OpenAI API", "Pinecone", "FAISS", "Streamlit", "Gradio", "Git"], // Shortened, Added Git
      color: "text-accent-red",
      borderColor: "border-danger/30",
      bgColor: "bg-danger/10",
    },
  ];
  
  // Mapping icons - better to do this in the component
  import { Brain, Code, Globe, Database, Server, Cpu } from "lucide-react";
  
  export const categoryTabs = [
      { value: "ai", label: "AI & ML", icon: Brain, data: aiSkillsData, color: "primary", stroke: "#1B998B", fill: "#1B998B"},
      { value: "programming", label: "Programming", icon: Code, data: programmingSkillsData, color: "accent", stroke: "#FFCB47", fill: "#FFCB47"},
      { value: "webdev", label: "Web & DevOps", icon: Globe, data: webDevSkillsData, color: "danger", stroke: "#E84855", fill: "#E84855"}, // Changed label slightly
  ]
  
  export const iconMap: { [key: string]: React.ElementType } = {
    Database: Database,
    Server: Server,
    Cpu: Cpu,
  };