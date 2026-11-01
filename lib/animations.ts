import { Variants } from "framer-motion";

// Custom easing functions for buttery smooth motion
export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  bouncy: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  snappy: [0.05, 0.7, 0.1, 1] as [number, number, number, number],
  slow: [0.16, 1, 0.3, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 200, damping: 20 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 10 },
};

/* =========================================================================
   ENTRANCE ANIMATIONS (Fades & Slides)
   ========================================================================= */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const blurFadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const elasticScale: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASING.spring,
  },
};

export const rotateIn3D: Variants = {
  hidden: { opacity: 0, rotateX: -15, y: 30, transformPerspective: 1200 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 1, ease: EASING.slow },
  },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 20 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", x: -20 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    x: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

/* =========================================================================
   STAGGER CONTAINERS
   ========================================================================= */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

export const cascadeReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

/* =========================================================================
   HOVER STATES
   ========================================================================= */

export const tiltHover = {
  rest: { rotateX: 0, rotateY: 0, z: 0 },
  hover: {
    rotateX: -5,
    rotateY: 5,
    z: 30,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
};

export const liftHover = {
  rest: { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 25px rgba(0,0,0,0.15), 0 0 40px rgba(99,102,241,0.2)",
    transition: { duration: 0.3, ease: EASING.smooth },
  },
};

export const glowHover = {
  rest: { boxShadow: "0 0 0px rgba(99,102,241,0)" },
  hover: {
    boxShadow: "0 0 40px rgba(99,102,241,0.3)",
    transition: { duration: 0.3, ease: EASING.smooth },
  },
};

/* =========================================================================
   EXIT & TRANSITIONS
   ========================================================================= */

export const fadeOutDown: Variants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
};

export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: EASING.smooth },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, filter: "blur(10px)", y: 20 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: EASING.smooth, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.98,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
};

/* =========================================================================
   CONTINUOUS ANIMATIONS
   ========================================================================= */

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(99,102,241,0.2)",
      "0 0 60px rgba(99,102,241,0.5)",
      "0 0 20px rgba(99,102,241,0.2)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -30, transformPerspective: 500 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASING.bouncy },
  },
};
