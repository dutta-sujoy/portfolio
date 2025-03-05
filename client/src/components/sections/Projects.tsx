import { motion } from "framer-motion";
import { useState, forwardRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";

const projects = [
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
    image: "https://private-user-images.githubusercontent.com/117010765/419195821-73c71c24-2240-4388-af2c-893f43317091.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDExMjMzOTQsIm5iZiI6MTc0MTEyMzA5NCwicGF0aCI6Ii8xMTcwMTA3NjUvNDE5MTk1ODIxLTczYzcxYzI0LTIyNDAtNDM4OC1hZjJjLTg5M2Y0MzMxNzA5MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMwNFQyMTE4MTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZjM1MWI4M2I3Yzc5MmRlMTk4ZGFlZWMxMTM5NTBhMGNhZmY3MDg1YjBkYjVjMWU4YTQ2NTRjMGQzMGE1YTg0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.CtNiqrnnIYYi_BS1pTngD1Qf_mNZpaSW0jkjgZR-lIQ",
    github: "https://github.com/dutta-sujoy/Twitter-Sentiment-Analysis",
    live: "https://sujoy0011-twitter-sentiment-analysis.hf.space",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Twitter_Sentiment_Analysis/tree/main",
    techStack: ["Python", "Scikit-Learn", "API", "NLTK", "NLP","Streamlit", "Hugging Face"]
  },
  {
    title: "House Price Prediction",
    description: "Machine learning model for predicting house prices using multiple regression techniques.",
    image: "https://private-user-images.githubusercontent.com/117010765/344370761-6ba49eb0-91db-4cc2-8acd-a3d0a6803639.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDExMjM3ODMsIm5iZiI6MTc0MTEyMzQ4MywicGF0aCI6Ii8xMTcwMTA3NjUvMzQ0MzcwNzYxLTZiYTQ5ZWIwLTkxZGItNGNjMi04YWNkLWEzZDBhNjgwMzYzOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMwNFQyMTI0NDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02MTk3MzE2YzVjZGU0YWJjOGRlNjhhZDkzOTYwN2MyMWM2YTIwYTZlNTViMTg4MDU3MTdkNmYwYTJkNTBjNTkzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.zLzrjY0rtbeTLz4mRjV0ASzB4JNHS9rgZrDnuoupvpw",
    github: "https://github.com/dutta-sujoy/Bengaluru-House-Price-Prediction",
    live: "https://sujoy0011-bengaluru-house-price-prediction.hf.space/",
    huggingface: "https://huggingface.co/spaces/sujoy0011/Bengaluru_House_Price_Prediction/tree/main",
    techStack: ["Python", "Scikit-Learn", "Streamlit", "Hugging Face"]
  }
];

const allTechStack = Array.from(
  new Set(projects.flatMap(project => project.techStack))
).sort();

export default forwardRef<HTMLElement>(function Projects(props, ref) {
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
      ref={ref}
      id="projects"
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {allTechStack.map((tech) => (
          <Badge
            key={tech}
            variant={selectedTech.includes(tech) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTech(tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.section>
  );
});
