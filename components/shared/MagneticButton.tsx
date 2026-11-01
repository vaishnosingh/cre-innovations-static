"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const variantStyles: Record<string, string> = {
  primary:   "text-white border-transparent shadow-[0_4px_20px_rgba(124,58,237,0.35)]",
  secondary: "bg-[var(--cream-2)] text-[var(--ink-1)] border-[var(--border-warm)] hover:bg-[var(--cream-3)]",
  outline:   "bg-transparent text-[var(--accent-violet)] border-[var(--accent-violet)] hover:bg-[var(--violet-pale)]",
};


export default function MagneticButton({
  children, className = "", onClick, href,
  variant = "primary", disabled, isLoading, type = "button", style,
}: MagneticButtonProps) {
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const [rippleProps, setRippleProps] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    if (isTouch) return; // Skip magnetic effect on touch devices
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate from center
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      
      // Magnetic pull only when cursor is inside the container (hitbox)
      x.set(dx * 0.4); 
      y.set(dy * 0.4);
    };

    const handleMouseLeave = () => {
      x.set(0); 
      y.set(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled || isLoading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleProps({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
    setTimeout(() => setRippleProps((prev) => ({ ...prev, show: false })), 600);
  };

  const baseClasses = "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-300 overflow-hidden outline-none";
  const stateClasses = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  const MotionTag = href ? motion.a : motion.button;
  // @ts-ignore - TS doesn't like dynamic motion tags with mixed props
  const MotionComponent: any = MotionTag;

  return (
    <div ref={containerRef} className="relative inline-block p-4 -m-4">
      {/* Invisible hitbox (p-4 -m-4 expands the area by 16px in all directions) */}
      <MotionComponent
        style={{
          x: springX,
          y: springY,
          ...(variant === "primary" ? { 
            background: "linear-gradient(145deg, #8b5cf6 0%, #6d28d9 100%)",
            color: "#ffffff",
            boxShadow: "0 10px 30px -10px rgba(124,58,237,0.6), inset 0 2px 4px rgba(255,255,255,0.3)"
          } : {}),
          ...style,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onPointerDown={handlePointerDown}
        className={`${baseClasses} ${variantStyles[variant]} ${stateClasses} ${className}`}
        onClick={onClick}
        href={href}
        type={href ? undefined : type}
        disabled={disabled || isLoading}
        data-cursor="pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 mr-1 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : children}
        </span>

        {/* Hover overlay glow */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />

        {/* Ripple effect */}
        <AnimatePresence>
          {rippleProps.show && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bg-white/20 rounded-full pointer-events-none"
              style={{
                left: rippleProps.x,
                top: rippleProps.y,
                width: 100,
                height: 100,
                transformOrigin: "center",
                marginLeft: -50,
                marginTop: -50,
              }}
            />
          )}
        </AnimatePresence>
      </MotionComponent>
    </div>
  );
}
