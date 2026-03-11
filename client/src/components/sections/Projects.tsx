import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "KIITGPT Chatbot",
    description: "A chatbot designed to answer questions about Kalinga Institute of Industrial Technology (KIIT). It utilizes the Llama 2 7B chat model, fine-tuned using LoRA (Low-Rank Adaptation) on a custom KIIT-specific dataset.",
    image: `${base}project_Img/KIITGPT.gif`,
    github: "https://github.com/dutta-sujoy/KiitGPT",
    huggingface: "https://huggingface.co/sujoy0011/kiit-llama2-lora-adapters",
    techStack: ["Python", "Transformers", "LLaMA 2", "Gradio", "LoRA", "Fine-tuned LLM"]
  },
  {
    title: "AgroBrain",
    description: "Contributed to AgroBrain, an AI-powered solution for farmers, developing 2 core models: Crop Recommendation and Disease Detection.",
    image: `${base}project_Img/AgroBrain.gif`,
    github: "https://github.com/Agro-Brain/AgroBrain/tree/main/Services",
    huggingface: "https://huggingface.co/spaces/sujoy0011/crop-prediction/tree/main",
    live: "https://agro-brain-27up.vercel.app/",
    techStack: ["Python", "Scikit-Learn", "CNN", "TensorFlow", "FastAPI", "Docker"]
  },
  {
    title: "NewsAI : Realtime news AI Agent",
    description: "It's a real-time, location-specific AI agent using LangChain and Gemini API to fetch and summarize local news.",
    image: `${base}project_Img/newsAi.png`,
    github: "https://github.com/dutta-sujoy/NewsAI",
    huggingface: "https://huggingface.co/spaces/sujoy0011/NewsAI-Backend",
    live: "https://news-ai-ten.vercel.app/",
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Docker"]
  },
  {
    title: "Movie Recommendation System",
    description: "AI-powered movie recommendation system using Content-Based Filtering, Streamlit, and TMDB API to suggest and display similar movies with posters.",
    image: "https://img.youtube.com/vi/i-B_I2DGIAI/maxresdefault.jpg",
    github: "https://github.com/dutta-sujoy/Movie-Recommendation-System",
    live: "https://sujoy0011-movie-recommendation-system.hf.space",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Movie-Recommendation-System/tree/main",
    techStack: ["Python", "Scikit-Learn", "Streamlit", "API", "Hugging Face"]
  },
  {
    title: "AI-Powered Resume Analyzer",
    description: "AI-Powered Resume Analyzer acts as a virtual HR, evaluating resumes, highlighting skill gaps, suggesting improvements, and providing job match scores.",
    image: "https://img.youtube.com/vi/9vFxT6wQ-TM/maxresdefault.jpg",
    github: "https://github.com/dutta-sujoy/ai-resume-analyzer",
    live: "https://sujoy0011-resume-analyzer.hf.space/",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Resume_Analyzer/tree/main",
    techStack: ["Python", "NLP", "Google Gemini", "Streamlit", "Hugging Face"]
  },
  {
    title: "Twitter Sentiment Analysis",
    description: "Real-time Twitter Sentiment Analysis using NLP and ML, feeding tweets through the API, and classifying them as positive or negative with Logistic Regression and TF-IDF.",
    image: `${base}project_Img/Twitter_Sentiment_Analysis.jpg`,
    github: "https://github.com/dutta-sujoy/Twitter-Sentiment-Analysis",
    live: "https://sujoy0011-twitter-sentiment-analysis.hf.space",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Twitter_Sentiment_Analysis/tree/main",
    techStack: ["Python", "Scikit-Learn", "API", "NLTK", "NLP", "Streamlit", "Hugging Face"]
  },
  {
    title: "House Price Prediction",
    description: "Machine learning model for predicting house prices using multiple regression techniques.",
    image: `${base}project_Img/House_Price_Prediction.jpg`,
    github: "https://github.com/dutta-sujoy/Bengaluru-House-Price-Prediction",
    live: "https://sujoy0011-bengaluru-house-price-prediction.hf.space/",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Bengaluru_House_Price_Prediction/tree/main",
    techStack: ["Python", "Scikit-Learn", "Streamlit", "Hugging Face"]
  }
];

const allTechStack = Array.from(
  new Set(projects.flatMap(project => project.techStack))
).sort();

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = selectedTech.length > 0
    ? projects.filter(project =>
        selectedTech.some(tech => project.techStack.includes(tech))
      )
    : projects;

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <motion.section
      id="projects"
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="03" title="Projects" />

        {/* Tech filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {allTechStack.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 ${
                selectedTech.includes(tech)
                  ? "bg-cyan-400/20 border-cyan-400/40 text-cyan-300 shadow-lg shadow-cyan-400/10"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} featured={index < 2} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
