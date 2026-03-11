import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const activeCard = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Spotlight effect inside glass-cards
      const target = e.target as HTMLElement;
      const card = target.closest(".glass-card") as HTMLElement | null;

      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--spotlight-x", `${x}px`);
        card.style.setProperty("--spotlight-y", `${y}px`);
        card.style.setProperty("--spotlight-opacity", "1");
        activeCard.current = card;
      } else if (activeCard.current) {
        activeCard.current.style.setProperty("--spotlight-opacity", "0");
        activeCard.current = null;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, textarea, [role='button'], .cursor-hover");
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (activeCard.current) {
        activeCard.current.style.setProperty("--spotlight-opacity", "0");
        activeCard.current = null;
      }
    };
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth ring follow
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = isHovering ? 24 : 18;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size}px, ${ringPos.current.y - size}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      style.remove();
    };
  }, [isVisible, isHovering]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          borderRadius: "50%",
          border: `1.5px solid rgba(148, 163, 184, ${isHovering ? 0.5 : 0.2})`,
          background: isHovering ? "rgba(148, 163, 184, 0.04)" : "transparent",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s ease, height 0.3s ease, border 0.3s ease, opacity 0.3s ease, background 0.3s ease",
        }}
      />
    </>
  );
}
