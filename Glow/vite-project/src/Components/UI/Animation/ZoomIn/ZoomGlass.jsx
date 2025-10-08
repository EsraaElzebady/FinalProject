// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ZoomGlass({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden overflow-x-hidden "
    >
      {/* Children (any element you pass inside) */}
      {children}

      {/* Glass overlay */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center"
      >
      </motion.div> */}
    </motion.div>
  );
}
