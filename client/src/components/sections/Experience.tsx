import { motion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";

const base = import.meta.env.BASE_URL;

const experiences = [
  {
    company: "Innotrat Labs",
    role: "AI/ML Developer Intern",
    duration: "May 2025 – Jun 2025",
    logo: `${base}img/ino.png`,
    description: [
      "Built an AI agent chatbot using LangChain to assist with electronics hardware and project-related queries.",
      "Integrated ChromaDB as a vector database for semantic search and context-aware retrieval.",
      "Developed key modules such as YOLO + QR-based object detection, automated flowchart and code generation, and hardware component recommendation.",
      "Fine-tuned a lightweight LLM on custom datasets for offline deployment on low-compute devices.",
    ]
  },
  {
    company: "GeeksforGeeks KIIT",
    role: "AI ML",
    duration: "Feb 2025 - Present",
    logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    description: [
      "Working on RAG Based AI Agent Projects.",
    ]
  },
  {
    company: "GeeksforGeeks KIIT",
    role: "Core Developer",
    duration: "Feb 2024 - Feb 2025 (1 yr)",
    logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    description: [
      "Designed and deployed 2+ web applications, improving community engagement.",
      "Conducted workshops for 500+ students on advanced programming concepts and tools"
    ]
  },
  {
    company: "AISoC",
    role: "Core Member",
    duration: "Feb 2023 - Feb 2025 (2 yrs)",
    logo: `${base}img/aisoc.jpg`,
    description: [
      "Participated in 2 AI-based projects, research, and workshops to foster innovation and skill development among peers.",
      "Organized AI/ML workshops for students on AI technologies."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}