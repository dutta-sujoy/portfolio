import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Globe } from "lucide-react";
import { SiHuggingface } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  huggingface?: string;
  techStack: string[];
  key: number;
}

export default function ProjectCard({ title, description, image, github, live, huggingface, techStack, key }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: key * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="perspective-1000 mx-2"
      >
      <Card className="group h-full ">
        <CardContent className="p-0 h-full">
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              {github && (
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {live && (
                <a 
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <Globe className="h-6 w-6" />
                </a>
              )}
              {huggingface && (
                <a 
                  href={huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <SiHuggingface className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}