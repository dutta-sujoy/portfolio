import { motion } from "framer-motion";
import SkillCircle from "@/components/SkillCircle";

const skillCategories = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "C", "C++"]
  },
  {
    category: "Technologies & Tools",
    skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Hugging Face", "Streamlit"]
  },
  {
    category: "AI Concepts",
    skills: ["Neural Networks", "LLMs", "Reinforcement Learning", "Deep Learning" , "Generative AI"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Skills
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {skillCategories.map((category, index) => (
            <SkillCircle key={index} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
