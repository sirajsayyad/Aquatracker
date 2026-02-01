import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useMobilePerformance from "../hooks/useMobilePerformance";

const Gauge = ({ label, value, unit, min = 0, max = 100, thresholds }) => {
  const { isMobile, reduceMotion } = useMobilePerformance();
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);

  // Determine color based on thresholds - memoized
  const { color, glowColor, status, statusColor } = useMemo(() => {
    let c = "#00f2ff"; // Cyan - Normal
    let g = "rgba(0, 242, 255, 0.5)";
    let s = "NORMAL";
    let sc = "text-cyan-400";

    if (value >= thresholds.critical) {
      c = "#ff003c"; // Danger
      g = "rgba(255, 0, 60, 0.6)";
      s = "CRITICAL";
      sc = "text-red-400";
    } else if (value >= thresholds.warning) {
      c = "#f59e0b"; // Warning
      g = "rgba(245, 158, 11, 0.5)";
      s = "WARNING";
      sc = "text-amber-400";
    }

    return { color: c, glowColor: g, status: s, statusColor: sc };
  }, [value, thresholds]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - percentage * circumference * 0.75; // 270 degrees = 0.75

  // Simplified animations for mobile
  const animationDuration = reduceMotion ? 0 : (isMobile ? 0.8 : 1.5);

  return (
    <motion.div
      className="holo-panel p-5 flex flex-col items-center justify-center h-full"
      initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: isMobile ? 0.2 : 0.4, ease: "easeOut" }}
      whileHover={isMobile ? {} : { scale: 1.02 }}
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
            transition={{ duration: animationDuration, ease: "easeOut" }}
            style={{
              filter: isMobile ? 'none' : `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold font-display text-white"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isMobile ? 0.2 : 0.5 }}
          >
            {value}
          </motion.span>
          <span className="text-[10px] text-gray-500">{unit}</span>
        </div>
      </div>

      {/* Status Badge */}
      <motion.div
        className={`mt-3 text-[10px] font-bold font-mono tracking-wider ${statusColor}`}
        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0.3 : 0.8 }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

// Custom comparison function for memo to prevent re-renders when values haven't changed
const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.label === nextProps.label &&
    prevProps.unit === nextProps.unit &&
    prevProps.min === nextProps.min &&
    prevProps.max === nextProps.max &&
    prevProps.thresholds?.warning === nextProps.thresholds?.warning &&
    prevProps.thresholds?.critical === nextProps.thresholds?.critical
  );
};

export default React.memo(Gauge, arePropsEqual);
