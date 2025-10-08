// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FadeSlideLeft({ content ,SlideDuration}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}   
      animate={{ opacity: 1, x: 0 }}     
      exit={{ opacity: 0, x: -50 }}     
      transition={{ duration: SlideDuration , ease: "easeInOut" }}
      className="p-6 bg-blue-200 rounded-lg shadow-lg"
    >
        {content}
    </motion.div>
  );
}