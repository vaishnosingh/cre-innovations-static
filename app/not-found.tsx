"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: "linear-gradient(135deg, #050510 0%, #0D0D2B 100%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="font-display font-extrabold text-[10rem] leading-none bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] bg-clip-text text-transparent mb-4">404</div>
        <h1 className="font-display font-bold text-3xl text-text-100 mb-4">Page Not Found</h1>
        <p className="text-[#A0A0C0] text-lg mb-8 max-w-md mx-auto">
          Looks like this page took a detour into the void. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="/" variant="primary">← Back to Home</MagneticButton>
          <MagneticButton href="/careers" variant="secondary">View Open Roles</MagneticButton>
        </div>
      </motion.div>
    </div>
  );
}
