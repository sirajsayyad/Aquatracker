import React from "react";
import { motion } from "framer-motion";

const Gauge = ({ label, value, unit, min = 0, max = 100, thresholds }) => {
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);

  // Determine color based on thresholds
  let color = "#00f2ff"; // Cyan - Normal
  let glowColor = "rgba(0, 242, 255, 0.5)";
  let status = "NORMAL";
  let statusColor = "text-cyan-400";

  if (value >= thresholds.critical) {
    color = "#ff003c"; // Danger
    glowColor = "rgba(255, 0, 60, 0.6)";
    status = "CRITICAL";
    statusColor = "text-red-400";
  } else if (value >= thresholds.warning) {
    color = "#f59e0b"; // Warning
    glowColor = "rgba(245, 158, 11, 0.5)";
    status = "WARNING";
    statusColor = "text-amber-400";
  }

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - percentage * circumference * 0.75; // 270 degrees = 0.75

  return (
    <motion.div
      className="holo-panel p-5 flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Label */}
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-3">
        {label}
      </span>

      {/* Circular Gauge */}
      <div className="relative w-24 h-24 flex-center">
        <svg
          className="w-full h-full transform -rotate-[135deg]"
          viewBox="0 0 100 100"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          />

          {/* Progress Arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold font-display text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {value}
          </motion.span>
          <span className="text-[10px] text-gray-500">{unit}</span>
        </div>
      </div>

      {/* Status Badge */}
      <motion.div
        className={`mt-3 text-[10px] font-bold font-mono tracking-wider ${statusColor}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

export default Gauge;
