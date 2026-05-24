import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.getAttribute("role") === "button" ||
        el.classList.contains("interactive");
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const animate = () => {
      setPos({ x: targetRef.current.x, y: targetRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          width: clicking ? 6 : hovering ? 8 : 8,
          height: clicking ? 6 : hovering ? 8 : 8,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/50"
        animate={{
          x: pos.x - (hovering ? 20 : 16),
          y: pos.y - (hovering ? 20 : 16),
          width: clicking ? 24 : hovering ? 40 : 32,
          height: clicking ? 24 : hovering ? 40 : 32,
          opacity: hidden ? 0 : hovering ? 0.8 : 0.4,
          borderColor: hovering ? "hsl(var(--primary) / 0.8)" : "hsl(var(--primary) / 0.4)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.5 }}
      />
    </>
  );
}
