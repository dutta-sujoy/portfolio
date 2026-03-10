import { motion } from "framer-motion";

interface SkillCircleProps {
  category: string;
  skills: string[];
  index: number;
}

const categoryIcons: Record<string, string> = {
  "Programming Languages": "💻",
  "Technologies & Tools": "⚡",
  "AI Concepts": "🧠",
};

export default function SkillCircle({ category, skills, index }: SkillCircleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="w-full sm:w-80 glass-card rounded-2xl p-6 group"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{categoryIcons[category] || "📦"}</span>
        <h3 className="text-lg font-semibold text-foreground">{category}</h3>
      </div>

      {/* Gradient line */}
      <div className="w-full h-[1px] mb-5 bg-gradient-to-r from-cyan-400/40 via-purple-400/20 to-transparent" />

      {/* Skill badges */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.15 + i * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-cyan-400/15 text-cyan-200/80 cursor-default transition-all duration-300 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10"
            style={{
              animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
