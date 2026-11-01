"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingElementsProps {
  count?: number;
  shapes?: ("circle" | "square" | "triangle" | "hexagon")[];
  colors?: string[];
  minOpacity?: number;
  maxOpacity?: number;
  parallax?: boolean;
}

export default function FloatingElements({
  count = 10,
  shapes = ["circle", "square", "triangle", "hexagon"],
  colors = ["#6366f1", "#06b6d4", "#a855f7", "#ffffff"],
  minOpacity = 0.05,
  maxOpacity = 0.15,
  parallax = true,
}: FloatingElementsProps) {
  const [elements, setElements] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random elements on client to avoid hydration mismatch
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 60 + 20, // 20px to 80px
      x: Math.random() * 100, // 0 to 100vw
      y: Math.random() * 100, // 0 to 100vh
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      duration: Math.random() * 20 + 10, // 10s to 30s
      delay: Math.random() * -20,
      rotationDir: Math.random() > 0.5 ? 1 : -1,
      yOffset: Math.random() * 100 + 50,
    }));
    
    setElements(newElements);
    setMounted(true);
  }, [count, shapes, colors, minOpacity, maxOpacity]);

  if (!mounted) return null;

  const renderShape = (shape: string, color: string) => {
    switch (shape) {
      case "square":
        return <rect width="100" height="100" fill="none" stroke={color} strokeWidth="2" />;
      case "circle":
        return <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="2" />;
      case "triangle":
        return <polygon points="50,5 95,95 5,95" fill="none" stroke={color} strokeWidth="2" />;
      case "hexagon":
        return <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" fill="none" stroke={color} strokeWidth="2" />;
      default:
        return <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="2" />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
            opacity: el.opacity,
          }}
          animate={{
            y: [0, -el.yOffset, 0],
            rotate: [0, 360 * el.rotationDir],
          }}
          transition={{
            y: {
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            },
            rotate: {
              duration: el.duration * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay,
            },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            {renderShape(el.shape, el.color)}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
