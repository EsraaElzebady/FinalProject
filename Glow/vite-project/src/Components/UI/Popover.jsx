import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Popover({ children, text, position = "top" }) {
  const [hovered, setHovered] = useState(false);

  // Positioning logic
  const positions = {
    top: "absolute -top-10 left-1/2 -translate-x-1/2",
    bottom: "absolute top-10 left-1/2 -translate-x-1/2",
    left: "absolute left-[-120%] top-1/2 -translate-y-1/2",
    right: "absolute right-[-120%] top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trigger element (SVG or anything) */}
      {children}

      {/* Popover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`${positions[position]} px-3 py-1 bg-black text-white text-xs rounded-lg shadow-lg whitespace-nowrap`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
