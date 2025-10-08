import { useState } from "react";
import { ChevronDown } from "lucide-react";

 function FAQItem({ question, answer ,greet}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left font-medium text-lg"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden text-gray-600">
          {answer}
          {greet && <p className="mt-2">{greet}</p>}
        </div>
      </div>
    </div>
  );
}

export default FAQItem;