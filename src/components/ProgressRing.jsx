import React from 'react';
import { motion } from 'framer-motion';

// Animated Progress Ring Component
const ProgressRing = ({
    progress = 0,
    size = 120,
    strokeWidth = 8,
    color = '#00f2ff',
    backgroundColor = 'rgba(255,255,255,0.1)',
    showValue = true,
    label = '',
    animated = true
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                />

                {/* Progress Circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: animated ? strokeDashoffset : strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        filter: `drop-shadow(0 0 6px ${color})`,
                    }}
                />

                {/* Glow Effect */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth + 4}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    opacity={0.2}
                    style={{
                        filter: `blur(4px)`,
                    }}
                />
            </svg>

            {/* Center Content */}
            {showValue && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-2xl font-bold font-display"
                        style={{ color }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                    {label && (
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono mt-1">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

// Multi-segment Progress Ring (for multiple values)
export const MultiProgressRing = ({
    segments = [],
    size = 140,
    strokeWidth = 10,
    gap = 4
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Calculate total and individual offsets
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    let currentOffset = 0;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                />

                {/* Segments */}
                {segments.map((segment, index) => {
                    const segmentLength = (segment.value / total) * circumference - gap;
                    const offset = currentOffset;
                    currentOffset += (segment.value / total) * circumference;

                    return (
                        <motion.circle
                            key={index}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={`${segmentLength} ${circumference}`}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: -offset }}
                            transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
                            style={{
                                filter: `drop-shadow(0 0 4px ${segment.color})`,
                            }}
                        />
                    );
                })}
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">{total}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total</span>
            </div>
        </div>
    );
};

// Liquid Fill Progress
export const LiquidProgress = ({
    progress = 0,
    size = 100,
    color = '#00f2ff',
    label = ''
}) => {
    return (
        <div
            className="relative overflow-hidden rounded-xl"
            style={{
                width: size,
                height: size,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            {/* Liquid Fill */}
            <motion.div
                className="absolute bottom-0 left-0 right-0"
                style={{
                    background: `linear-gradient(180deg, ${color}40 0%, ${color} 100%)`,
                    boxShadow: `0 -10px 20px ${color}40`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Wave Effect */}
            <motion.div
                className="absolute left-0 right-0"
                style={{
                    height: 20,
                    bottom: `calc(${progress}% - 10px)`,
                    background: `radial-gradient(ellipse at center, ${color}60 0%, transparent 70%)`,
                }}
                animate={{
                    scaleX: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                    {Math.round(progress)}%
                </span>
                {label && (
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider mt-1">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProgressRing;
