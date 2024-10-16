import { useEffect, useState, RefObject } from "react";

const useAnimatedNumber = (
  ref: RefObject<HTMLDivElement>,
  finalValue: number
) => {
  const [value, setValue] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (!isInView) return; // Don't animate if not in view

    let count = 0;
    const increment = Math.ceil(finalValue / 100); // Increment by a fraction of the final value

    const animate = () => {
      if (count < finalValue) {
        count += increment;
        if (count > finalValue) count = finalValue; // Ensure we don’t exceed the final value
        setValue(count);
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [finalValue, isInView]);

  return value;
};

export default useAnimatedNumber;
