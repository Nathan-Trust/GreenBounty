import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CustomAccordionProps {
  title: string;
  content: React.ReactNode;
}

const CustomAccordion = ({ title, content }: CustomAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#0047F112] text-sm p-3 mt-2 rounded-md">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <p className="text-md font-medium">{title}</p>
        <ChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          size={20}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#1C2024] text-xs mt-1.5 overflow-hidden"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomAccordion;
