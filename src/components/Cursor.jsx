import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Subtle custom cursor ring for desktop (fine pointer) devices only. */
export default function Cursor() {
  const [pos, setPos] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      setHover(!!e.target.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!pos) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[120] rounded-full border border-volt mix-blend-difference"
      style={{ width: 36, height: 36 }}
      animate={{
        x: pos.x - 18,
        y: pos.y - 18,
        scale: hover ? 1.8 : 1,
        opacity: hover ? 0.9 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.6 }}
    />
  );
}
