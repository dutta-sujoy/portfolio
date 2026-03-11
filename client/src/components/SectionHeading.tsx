import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-12 md:mb-16"
    >
      {/* Number badge */}
      <span className="text-sm font-mono font-semibold text-cyan-400/80 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full flex-shrink-0">
        {number}
      </span>
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
        {title}
      </h2>
      {/* Gradient line */}
      <div className="flex-grow h-[1px] bg-gradient-to-r from-cyan-400/30 via-purple-400/15 to-transparent" />
    </motion.div>
  );
}
