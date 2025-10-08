// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FadeInUp({ children, delay = 0 ,duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}    
      whileInView={{ opacity: 1, y: 0 }}  
      viewport={{ once: true, amount: 0.2 }}   
      transition={{ duration , delay }} 
    >
      {children}
    </motion.div>
  );
}