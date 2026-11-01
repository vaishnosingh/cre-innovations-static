import { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition(springConfig = { stiffness: 300, damping: 30 }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return { x: springX, y: springY, rawX: position.x, rawY: position.y };
}
