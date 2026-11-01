"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "text" | "view" | "magnetic">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfigDot = { damping: 25, stiffness: 400, mass: 0.2 };
  const springConfigRing = { damping: 30, stiffness: 200, mass: 0.5 };

  const smoothCursorX = useSpring(cursorX, springConfigDot);
  const smoothCursorY = useSpring(cursorY, springConfigDot);
  const smoothRingX = useSpring(ringX, springConfigRing);
  const smoothRingY = useSpring(ringY, springConfigRing);

  useEffect(() => {
    // Check if it's a touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check what element is currently being hovered
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attribute traversing up the DOM
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") as any;
        setCursorState(type);
      } else if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || 
        target.closest("button")
      ) {
        setCursorState("pointer");
      } else if (
        target.tagName.toLowerCase() === "input" || 
        target.tagName.toLowerCase() === "textarea" || 
        target.tagName.toLowerCase() === "p" || 
        target.tagName.toLowerCase() === "h1" ||
        target.tagName.toLowerCase() === "h2" ||
        target.tagName.toLowerCase() === "h3"
      ) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!mounted || isTouchDevice) return null;

  // Render logic for different states
  const renderViewContent = () => {
    if (cursorState === "view") {
      return (
        <span className="text-[9px] font-bold tracking-widest text-text-100 uppercase absolute inset-0 flex items-center justify-center">
          View
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { cursor: none; }
        a, button, input, textarea { cursor: none; }
      `}} />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState === "view" ? 64 : cursorState === "pointer" || cursorState === "magnetic" ? 48 : cursorState === "text" ? 2 : 36,
          height: cursorState === "view" ? 64 : cursorState === "pointer" || cursorState === "magnetic" ? 48 : cursorState === "text" ? 24 : 36,
          borderRadius: cursorState === "text" ? "2px" : "50%",
          backgroundColor: cursorState === "view" ? "rgba(99, 102, 241, 0.9)" : cursorState === "pointer" ? "rgba(99, 102, 241, 0.15)" : "transparent",
          border: cursorState === "text" ? "none" : cursorState === "view" ? "1px solid rgba(99, 102, 241, 1)" : "1px solid var(--cream-4)",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {renderViewContent()}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: cursorState === "text" || cursorState === "view" ? "transparent" : "var(--ink-0)",
        }}
        animate={{
          scale: isClicking ? 0.5 : cursorState === "pointer" ? 0.5 : cursorState === "magnetic" ? 0 : 1,
          opacity: cursorState === "text" || cursorState === "view" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
