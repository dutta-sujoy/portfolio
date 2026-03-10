import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";

interface TimelineItemProps {
  company: string;
  role: string;
  duration: string;
  description: string[];
  logo: string;
  index: number;
}

export default function TimelineItem({ company, role, duration, description, logo, index }: TimelineItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="mb-8 last:mb-0"
    >
      {/* Row: avatar | line | card */}
      <div className="flex items-stretch gap-4">
        {/* Left column: avatar + line, fixed width */}
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          {/* Avatar */}
          <motion.div
            className="relative z-10"
            whileHover={{ scale: 1.1 }}
          >
            <Avatar className="h-12 w-12 border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/10">
              <AvatarImage src={logo} alt={company} />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-[10px] font-bold">
                {company.split(' ').map(word => word[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-cyan-400/30" style={{ animationDuration: '3s' }} />
          </motion.div>
          {/* Vertical line */}
          <div className="w-[2px] flex-grow bg-gradient-to-b from-cyan-400/30 via-purple-400/20 to-transparent mt-2" />
        </div>

        {/* Right column: duration + card */}
        <div className="flex-1 min-w-0 pb-2">
          <span className="text-xs font-medium text-muted-foreground/60 tracking-wider uppercase mb-2 block">
            {duration}
          </span>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card rounded-xl transition-transform duration-300 ease-out"
          >
            <CardContent className="p-4 md:p-6">
              <div className="mb-3">
                <h3 className="text-base md:text-lg font-semibold text-foreground">{company}</h3>
                <p className="text-sm text-cyan-400/80 font-medium">{role}</p>
              </div>
              <ul className="space-y-2">
                {description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>
        </div>
      </div>
    </motion.div>
  );
}