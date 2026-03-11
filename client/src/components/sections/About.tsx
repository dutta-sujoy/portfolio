import { forwardRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Wrench, Music, Code2, Bike, Plane } from "lucide-react";
import { SiPython, SiTensorflow, SiPytorch } from "react-icons/si";
import { FaBrain, FaRobot } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default forwardRef<HTMLElement>(function About(_props, ref) {
  return (
    <section id="about" className="py-20 px-4">
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <SectionHeading number="01" title="About Me" />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bio card — spans 2 cols */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8 group hover:border-cyan-400/20 transition-all duration-300"
          >
            <div className="w-14 h-1 mb-6 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400" />
            <p className="text-base leading-relaxed text-muted-foreground/90">
              I am an AI/ML enthusiast and software developer with experience in building intelligent systems. 
              Passionate about <span className="text-foreground font-medium">Deep Learning</span>, <span className="text-foreground font-medium">Generative AI</span>, 
              and <span className="text-foreground font-medium">LLMs</span>, I create solutions that bridge the gap between technology and real-world applications. 
              Beyond coding, I have a strong interest in robotics and enjoy working on innovative hardware projects.
            </p>
          </motion.div>

          {/* Location card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-pink-400/20 transition-all duration-300"
          >
            <MapPin className="w-5 h-5 text-pink-400/70 mb-3" />
            <div>
              <p className="text-2xl font-bold text-foreground">India</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Based in Kolkata</p>
            </div>
            <div className="mt-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-pink-400/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>

          {/* Tech stack card */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 group hover:border-cyan-400/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-cyan-400/70" />
              <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">Currently building with</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <SiPython />, color: "#3776AB", name: "Python" },
                { icon: <SiTensorflow />, color: "#FF6F00", name: "TensorFlow" },
                { icon: <SiPytorch />, color: "#EE4C2C", name: "PyTorch" },
                { icon: <FaBrain />, color: "#8B5CF6", name: "LLMs" },
                { icon: <FaRobot />, color: "#06B6D4", name: "Gen AI" },
              ].map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: `${tech.color}15`,
                    border: `1px solid ${tech.color}25`,
                    color: tech.color,
                  }}
                >
                  <span className="text-sm">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests card — spans 2 cols */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-2xl p-6 group hover:border-purple-400/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-purple-400/70" />
              <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">Beyond code</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Music className="w-5 h-5" />, label: "Guitar", color: "#F59E0B" },
                { icon: <Bike className="w-5 h-5" />, label: "Biking", color: "#EF4444" },
                { icon: <Plane className="w-5 h-5" />, label: "Traveling", color: "#06B6D4" },
                { icon: <Code2 className="w-5 h-5" />, label: "Robotics", color: "#10B981" },
              ].map((interest) => (
                <motion.div
                  key={interest.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-default"
                  style={{
                    background: `${interest.color}10`,
                    border: `1px solid ${interest.color}20`,
                  }}
                >
                  <span style={{ color: interest.color }}>{interest.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground/80">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </section>
  );
});
