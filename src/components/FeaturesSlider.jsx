import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Brain, Smartphone, FileText, Cpu, Building2, Mic, Clock, ArrowRight } from 'lucide-react';
import { upcomingFeatures } from '../data/mockData';

const FeaturesSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? upcomingFeatures.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === upcomingFeatures.length - 1 ? 0 : prev + 1));
    };

    const getIcon = (iconName) => {
        const icons = {
            brain: Brain,
            smartphone: Smartphone,
            fileText: FileText,
            cpu: Cpu,
            building: Building2,
            mic: Mic,
        };
        const IconComponent = icons[iconName] || Sparkles;
        return <IconComponent size={28} />;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Development': return 'text-green-400 bg-green-500/10 border-green-500/30';
            case 'Planning': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
            case 'Research': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            default: return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
        }
    };

    const getProgressColor = (status) => {
        switch (status) {
            case 'In Development': return 'from-green-500 to-cyan-500';
            case 'Planning': return 'from-amber-500 to-orange-500';
            case 'Research': return 'from-purple-500 to-pink-500';
            default: return 'from-cyan-500 to-blue-500';
        }
    };

    return (
        <motion.div
            className="holo-panel p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Gradient Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 animate-gradient-x" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex-center">
                        <Sparkles size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-display">Coming Soon</h3>
                        <p className="text-xs text-gray-500 font-mono">Upcoming Features</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-mono mr-2">
                        {currentIndex + 1} / {upcomingFeatures.length}
                    </span>
                    <motion.button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Feature Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Left: Feature Info */}
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex-center text-purple-400">
                                {getIcon(upcomingFeatures[currentIndex].icon)}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-bold font-display text-white mb-1">
                                    {upcomingFeatures[currentIndex].title}
                                </h4>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(upcomingFeatures[currentIndex].status)}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    {upcomingFeatures[currentIndex].status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            {upcomingFeatures[currentIndex].description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {upcomingFeatures[currentIndex].tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* ETA */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={14} />
                            <span className="font-mono">Expected: {upcomingFeatures[currentIndex].eta}</span>
                        </div>
                    </div>

                    {/* Right: Progress */}
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <div>
                            <h5 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Development Progress</h5>

                            {/* Progress Circle */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="10"
                                        />
                                        <motion.circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            strokeDasharray={314}
                                            initial={{ strokeDashoffset: 314 }}
                                            animate={{ strokeDashoffset: 314 - (upcomingFeatures[currentIndex].progress / 100) * 314 }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                        />
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#bd00ff" />
                                                <stop offset="100%" stopColor="#00f2ff" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold font-display text-white">
                                            {upcomingFeatures[currentIndex].progress}%
                                        </span>
                                        <span className="text-[10px] text-gray-500 uppercase">Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium hover:bg-purple-500/20 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => alert(`You'll be notified when "${upcomingFeatures[currentIndex].title}" is ready!`)}
                        >
                            <span>Get Notified</span>
                            <ArrowRight size={16} />
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
                {upcomingFeatures.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                            ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-500'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default FeaturesSlider;
