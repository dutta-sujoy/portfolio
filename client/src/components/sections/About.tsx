import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default forwardRef<HTMLElement>(function About(_props, ref) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="py-20 px-4">
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="section-heading">About Me</h2>

        <div className="perspective-container">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="glass-card rounded-2xl p-8 md:p-12 cursor-default"
          >
            {/* Gradient accent line */}
            <div className="w-20 h-1 mb-8 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400" />
            
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90">
              I am an AI/ML enthusiast and software developer with experience in building intelligent systems. 
              Passionate about <span className="text-foreground font-medium">Deep Learning</span>, <span className="text-foreground font-medium">Generative AI</span>, 
              and <span className="text-foreground font-medium">LLMs</span>, I create solutions that bridge the gap between technology and real-world applications. 
              Beyond coding, I have a strong interest in robotics and enjoy working on innovative hardware projects. 
              In my free time, I love playing the guitar, traveling, and exploring new places on bike.
            </p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
              <span className="w-2 h-2 rounded-full bg-purple-400/60" />
              <span className="w-2 h-2 rounded-full bg-pink-400/60" />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </section>
  );
});
