import { AnimatePresence, motion } from "framer-motion";

/** Loading animation inspired by the Cachi circular symbol. */
export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          aria-hidden="true"
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-volt/30"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-volt/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="h-10 w-10 rounded-full bg-volt"
              animate={{ scale: [0.85, 1.12, 0.9] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="mt-8 font-display text-sm font-semibold tracking-[0.55em] text-paper/80"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            CACHI
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
