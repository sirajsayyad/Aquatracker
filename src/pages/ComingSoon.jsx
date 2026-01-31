import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';

const ComingSoon = ({ title }) => {
    return (
        <div className="h-full flex items-center justify-center p-8">
            <motion.div
                className="holo-panel p-12 max-w-lg text-center relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Decorative Top Gradient Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 animate-gradient-x" />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 3) * 20}%`,
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>

                {/* Icon */}
                <motion.div
                    className="relative inline-flex mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full animate-pulse-glow" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex-center">
                        <Lock size={32} className="text-cyan-400" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-3xl font-bold font-display text-white mb-3 text-glow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-gray-400 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    This module is currently under development. <br />
                    Access will be enabled in a future update.
                </motion.p>

                {/* Status Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Sparkles size={14} className="text-purple-400" />
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Coming Soon</span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    className="btn-cyber flex items-center gap-2 mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>Notify Me</span>
                    <ArrowRight size={14} />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
