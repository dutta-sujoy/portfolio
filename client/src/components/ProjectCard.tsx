import { motion } from "framer-motion";
import { Github, Globe, Star } from "lucide-react";
import { SiHuggingface } from "react-icons/si";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  huggingface?: string;
  techStack: string[];
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({ title, description, image, github, live, huggingface, techStack, featured, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`glass-card rounded-xl h-full overflow-hidden transition-all duration-300 ease-out group cursor-default ${
          featured ? "ring-1 ring-cyan-400/20" : ""
        }`}
      >
        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Globe className="h-5 w-5" />
              </motion.a>
            )}
            {huggingface && (
              <motion.a
                href={huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <SiHuggingface className="h-5 w-5" />
              </motion.a>
            )}
          </div>

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">{title}</h3>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 pt-3">
          <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-3 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-cyan-400/10 text-cyan-300/80 border border-cyan-400/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}