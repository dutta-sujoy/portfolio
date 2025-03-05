import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCircleProps {
  category: string;
  skills: string[];
  index: number;
}

export default function SkillCircle({ category, skills, index }: SkillCircleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
    >
      <Card className="relative w-72 h-72 rounded-full overflow-hidden bg-black/30 shadow-lg">
        <CardContent className="h-full flex items-center justify-center p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-primary/20 rounded-full text-sm text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
