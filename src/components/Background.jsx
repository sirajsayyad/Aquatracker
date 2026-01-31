import React from "react";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <>
      {/* Primary Ambient Background */}
      <div className="cinematic-bg" />

      {/* Grid Overlay */}
      <div className="grid-overlay" />

      {/* Floating Orbs */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
          zIndex: -1,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(189, 0, 255, 0.06) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          zIndex: -1,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Noise Texture Overlay (subtle) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: -1,
        }}
      />
    </>
  );
};

export default Background;
