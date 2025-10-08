import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "../../../Components/UI/Animation/FadeInUp/FadeInUp";
import { content, logos } from "../../../Data/Data";

export default function AboutInfo() {
  const [active, setActive] = useState("first");

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

 

  return (
    <div className="bg-[#F5F5F5] flex flex-col items-center justify-center p-20 my-10 rounded-lg">
  <FadeInUp duration={1} delay={0.2}>
  <div className="relative w-200 text-center h-24 flex items-center justify-center font-semibold text-[16px] bg-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute"
          >
            <h3 className="text-lg lg:w-150 sm:w-fit md:w-fit">{content[active]}</h3>
          </motion.div>
        </AnimatePresence>
      </div>
  </FadeInUp>

   <div className="p-6 ">
        <div className="flex flex-wrap   gap-4 mb-6">
          {logos.map((logo) => (
              <FadeInUp  duration={1} delay={0.4}>
                 <button
                 key={logo.id}
              onClick={() => setActive(logo.id)}
              className={`transition-opacity duration-200 ${
                active === logo.id
                  ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
            >
              <div className="w-35 h-30">
                <img src={logo.src} alt="quote-icon" />
              </div>
            </button>
            </FadeInUp>
          ))}
        </div>
      </div>
      
    </div>
  );
}
