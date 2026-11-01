import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useParallax(distance: number = 50): { ref: React.RefObject<any>; y: MotionValue<number> } {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return { ref, y };
}
