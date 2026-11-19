import { motion, useReducedMotion } from "framer-motion";

/**
 * The Cachi circular symbol — recurring brand device expressing continuous
 * exploration, movement and the connection between ideas.
 */
export default function CircleMotif({ className = "", size = 460 }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* outer dashed ring — slow rotation */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#F1ED28"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
      </motion.svg>

      {/* inner dotted ring — counter rotation */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#F4F4F0"
          strokeOpacity="0.25"
          strokeWidth="0.75"
          strokeDasharray="1 6"
        />
      </motion.svg>

      {/* core disc — breathing */}
      <motion.div
        className="absolute rounded-full bg-volt"
        style={{
          width: size * 0.32,
          height: size * 0.32,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={reduce ? undefined : { scale: [0.92, 1.06, 0.96, 1.02] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* orbiting satellite */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-volt" />
      </motion.div>
    </div>
  );
}
