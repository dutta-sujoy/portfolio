import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  SiPython, SiTensorflow, SiPytorch,
  SiScikitlearn, SiHuggingface, SiStreamlit
} from "react-icons/si";
import { FaJava, FaBrain, FaRobot, FaCode, FaMicrochip, FaNetworkWired, FaCogs } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const allSkills: SkillItem[] = [
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "Java", icon: <FaJava />, color: "#ED8B00" },
  { name: "C++", icon: <TbBrandCpp />, color: "#00599C" },
  { name: "C", icon: <FaCode />, color: "#A8B9CC" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
  { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
  { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F7931E" },
  { name: "Hugging Face", icon: <SiHuggingface />, color: "#FFD21E" },
  { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B" },
  { name: "Deep Learning", icon: <FaBrain />, color: "#8B5CF6" },
  { name: "LLMs", icon: <FaRobot />, color: "#06B6D4" },
  { name: "Transformers", icon: <FaCogs />, color: "#10B981" },
  { name: "Neural Nets", icon: <FaNetworkWired />, color: "#EC4899" },
  { name: "Gen AI", icon: <FaMicrochip />, color: "#F472B6" },
  { name: "AI Agents", icon: <FaRobot />, color: "#22D3EE" },
  { name: "RL", icon: <FaBrain />, color: "#A78BFA" },
];

const innerSkills = allSkills.slice(0, 6);
const outerSkills = allSkills.slice(6, 16);

const TILT_DEG = 38;
const TILT_RAD = (TILT_DEG * Math.PI) / 180;
const HIT_RADIUS = 55; // px distance for hover detection

// Calculate the 2D screen position of an orbiting icon given the current angle
function getScreenPos(itemAngle: number, radius: number, centerX: number, centerY: number) {
  const rad = (itemAngle * Math.PI) / 180;
  // Position on circle (before tilt)
  const x3d = Math.cos(rad) * radius;
  const y3d = Math.sin(rad) * radius;
  // Apply rotateX tilt: y is compressed, z is created
  const screenX = centerX + x3d;
  const screenY = centerY + y3d * Math.cos(TILT_RAD);
  return { screenX, screenY };
}

export default function Skills() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Orbit refs for DOM manipulation
  const innerItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation state (not React state to avoid re-renders)
  const innerAngle = useRef(0);
  const outerAngle = useRef(0);
  const dragRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Hover state — managed via React for re-rendering the hovered icon only
  const [hoveredIcon, setHoveredIcon] = useState<{ ring: 'inner' | 'outer'; idx: number } | null>(null);

  // Mouse position tracking for proximity-based hover
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRect = useRef({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);
  useEffect(() => { dragRef.current = dragOffset; }, [dragOffset]);

  const isMobile = window.innerWidth < 640;
  const innerRadius = isMobile ? Math.min(window.innerWidth * 0.18, 110) : Math.min(window.innerWidth * 0.22, 180);
  const outerRadius = isMobile ? Math.min(window.innerWidth * 0.34, 185) : Math.min(window.innerWidth * 0.4, 320);

  // Animation loop
  useEffect(() => {
    let rafId: number;

    const animate = (timestamp: number) => {
      // Auto-rotate when not dragging
      if (!isDraggingRef.current) {
        innerAngle.current += 0.15;
        outerAngle.current -= 0.1;
      }

      const innerBase = innerAngle.current + dragRef.current * 0.3;
      const outerBase = outerAngle.current - dragRef.current * 0.3;

      // Update container rect periodically
      if (containerRef.current && Math.round(timestamp) % 10 === 0) {
        const r = containerRef.current.getBoundingClientRect();
        containerRect.current = { left: r.left, top: r.top, width: r.width, height: r.height };
      }

      const cx = containerRect.current.width / 2;
      const cy = containerRect.current.height / 2;
      const mx = mousePos.current.x - containerRect.current.left;
      const my = mousePos.current.y - containerRect.current.top;

      let closestDist = HIT_RADIUS;
      let closestHit: { ring: 'inner' | 'outer'; idx: number } | null = null;

      // Update inner orbit
      for (let i = 0; i < innerSkills.length; i++) {
        const el = innerItemRefs.current[i];
        const wrap = innerWrapRefs.current[i];
        if (!el || !wrap) continue;

        const itemAngle = innerBase + (360 / innerSkills.length) * i;
        const rad = (itemAngle * Math.PI) / 180;
        const zPos = Math.sin(rad) * Math.sin(TILT_RAD);
        const scale = 1 + zPos * 0.45;
        const opacity = 0.7 + zPos * 0.3;
        const zIdx = Math.round(zPos * 100) + 100;

        el.style.transform = `rotate(${itemAngle}deg) translateX(${innerRadius}px)`;
        el.style.zIndex = String(zIdx);
        wrap.style.transform = `rotate(${-itemAngle}deg) rotateX(${-TILT_DEG}deg) scale(${scale})`;
        wrap.style.opacity = String(opacity);

        // Proximity hover check
        const { screenX, screenY } = getScreenPos(itemAngle, innerRadius, cx, cy);
        const dist = Math.hypot(mx - screenX, my - screenY);
        if (dist < closestDist) {
          closestDist = dist;
          closestHit = { ring: 'inner', idx: i };
        }
      }

      // Update outer orbit
      for (let i = 0; i < outerSkills.length; i++) {
        const el = outerItemRefs.current[i];
        const wrap = outerWrapRefs.current[i];
        if (!el || !wrap) continue;

        const itemAngle = outerBase + (360 / outerSkills.length) * i;
        const rad = (itemAngle * Math.PI) / 180;
        const zPos = Math.sin(rad) * Math.sin(TILT_RAD);
        const scale = 1 + zPos * 0.45;
        const opacity = 0.7 + zPos * 0.3;
        const zIdx = Math.round(zPos * 100) + 100;

        el.style.transform = `rotate(${itemAngle}deg) translateX(${outerRadius}px)`;
        el.style.zIndex = String(zIdx);
        wrap.style.transform = `rotate(${-itemAngle}deg) rotateX(${-TILT_DEG}deg) scale(${scale})`;
        wrap.style.opacity = String(opacity);

        const { screenX, screenY } = getScreenPos(itemAngle, outerRadius, cx, cy);
        const dist = Math.hypot(mx - screenX, my - screenY);
        if (dist < closestDist) {
          closestDist = dist;
          closestHit = { ring: 'outer', idx: i };
        }
      }

      // Update hover only when it changes
      setHoveredIcon((prev) => {
        if (prev?.ring === closestHit?.ring && prev?.idx === closestHit?.idx) return prev;
        return closestHit;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [innerRadius, outerRadius]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isDragging) return;
    const deltaX = e.clientX - lastX.current;
    setDragOffset((prev) => prev + deltaX * 0.5);
    lastX.current = e.clientX;
  }, [isDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: -9999, y: -9999 };
    setIsDragging(false);
  }, []);

  const renderIcon = (skill: SkillItem, i: number, ring: 'inner' | 'outer') => {
    const isHovered = hoveredIcon?.ring === ring && hoveredIcon?.idx === i;
    const itemRefs = ring === 'inner' ? innerItemRefs : outerItemRefs;
    const wrapRefs = ring === 'inner' ? innerWrapRefs : outerWrapRefs;

    return (
      <div
        key={skill.name}
        ref={(el) => { itemRefs.current[i] = el; }}
        className="absolute"
        style={{ willChange: "transform" }}
      >
        <div
          ref={(el) => { wrapRefs.current[i] = el; }}
          style={{ willChange: "transform, opacity", transition: "opacity 0.15s ease" }}
        >
          <div className="relative">
            {/* Icon circle */}
            <div
              className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-200"
              style={{
                background: `radial-gradient(circle, ${skill.color}22, ${skill.color}08)`,
                border: `1.5px solid ${skill.color}${isHovered ? '80' : '30'}`,
                boxShadow: isHovered
                  ? `0 0 25px ${skill.color}40, 0 0 50px ${skill.color}15`
                  : `0 0 8px ${skill.color}10`,
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <span
                className="text-lg sm:text-2xl md:text-3xl transition-all duration-200"
                style={{
                  color: skill.color,
                  filter: isHovered ? "brightness(1.5)" : "none",
                }}
              >
                {skill.icon}
              </span>
            </div>

            {/* Name label */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none transition-all duration-200"
              style={{
                background: isHovered ? `${skill.color}25` : 'transparent',
                color: skill.color,
                border: isHovered ? `1px solid ${skill.color}35` : '1px solid transparent',
                backdropFilter: isHovered ? "blur(12px)" : "none",
                textShadow: `0 0 10px ${skill.color}50`,
                opacity: isHovered ? 1 : 0,
                transform: isHovered
                  ? 'translateX(-50%) translateY(0) scale(1)'
                  : 'translateX(-50%) translateY(-4px) scale(0.8)',
              }}
            >
              {skill.name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="Skills" />

        <p className="text-center text-xs text-muted-foreground/35 mb-4 -mt-8">
          Hover to see · Hold & drag to control
        </p>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mx-auto flex items-center justify-center select-none overflow-hidden"
          style={{
            width: "min(95vw, 800px)",
            height: isMobile ? "min(90vw, 420px)" : "min(95vw, 800px)",
            perspective: "1000px",
            cursor: isDragging ? "grabbing" : "default",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${TILT_DEG}deg)`,
            }}
          >
            {/* Center glow */}
            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center z-10">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />
              <span
                className="gradient-text text-base sm:text-xl md:text-2xl font-bold relative z-10"
                style={{ transform: `rotateX(${-TILT_DEG}deg)` }}
              >
                Tech
              </span>
            </div>

            {/* Orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute rounded-full border border-white/[0.06]"
                style={{ width: innerRadius * 2, height: innerRadius * 2 }}
              />
              {innerSkills.map((skill, i) => renderIcon(skill, i, 'inner'))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute rounded-full border border-white/[0.06]"
                style={{ width: outerRadius * 2, height: outerRadius * 2 }}
              />
              {outerSkills.map((skill, i) => renderIcon(skill, i, 'outer'))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
