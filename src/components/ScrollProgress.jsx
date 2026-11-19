import { motion, useScroll, useSpring } from "framer-motion";

/** Signature Cachi scroll progress ring (bottom-right, desktop only). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.svg
      viewBox="0 0 44 44"
      className="fixed bottom-6 right-6 z-[70] hidden h-11 w-11 md:block"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="18" fill="none" stroke="#F4F4F0" strokeOpacity="0.12" strokeWidth="2" />
      <motion.circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="#F1ED28"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: progress }}
        transform="rotate(-90 22 22)"
      />
      <circle cx="22" cy="22" r="3.5" fill="#F1ED28" />
    </motion.svg>
  );
}
