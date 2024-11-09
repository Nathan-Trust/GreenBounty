import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

interface TabsProps {
  labels: string[];
  links?: (string | null)[];
  className?: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  labels,
  links = [],
  className,
  activeIndex,
  setActiveIndex,
}) => {
  const tabRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeIndex]);

  return (
    <div
      className={cn(
        "border-b w-full flex gap-6 relative pt-3 overflow-x-auto",
        className
      )}
    >
      {labels.map((label, index) => {
        const hasLink = links[index] && links[index] !== null;

        return hasLink ? (
          <Link
            key={index}
            ref={(el) => {
              if (el) {
                tabRefs.current[index] = el;
              }
            }}
            to={links[index]!}
            className={`relative pb-2 cursor-pointer ${
              activeIndex === index ? "" : "text-gray-500"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <p className="whitespace-nowrap capitalize">
              {label == "mypickup" ? "My Pickup" : label}
            </p>
          </Link>
        ) : (
          <button
            key={index}
            ref={(el) => {
              if (el) {
                tabRefs.current[index] = el;
              }
            }}
            className={`relative pb-2 cursor-pointer ${
              activeIndex === index ? "" : "text-gray-500"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <p className="whitespace-nowrap">{label}</p>
          </button>
        );
      })}

      {/* Single underline that moves under the active tab */}
      <span
        className="absolute bg-primary h-0.5 rounded-md bottom-0 transition-all duration-300 ease-in-out"
        style={{
          width: `${underlineStyle.width}px`,
          left: `${underlineStyle.left}px`,
        }}
      ></span>
    </div>
  );
};

export default Tabs;
