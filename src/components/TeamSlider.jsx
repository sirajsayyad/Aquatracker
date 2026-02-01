import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  ExternalLink,
} from "lucide-react";
import { teamMembers } from "../data/mockData";
import useMobilePerformance from "../hooks/useMobilePerformance";

const TeamSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const { isMobile, reduceMotion } = useMobilePerformance();

  // Adjust cards per view based on screen size
  const cardsPerView = isMobile ? 1 : 3;

  // Disable auto-play on mobile, increase interval on desktop
  const autoPlayInterval = isMobile ? null : 6000; // 6s instead of 4s, disabled on mobile

  // Auto-play functionality - optimized
  useEffect(() => {
    if (!isAutoPlaying || !autoPlayInterval || reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= teamMembers.length - cardsPerView ? 0 : prev + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, autoPlayInterval, cardsPerView, reduceMotion]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? teamMembers.length - cardsPerView : prev - 1
    );
  }, [cardsPerView]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev >= teamMembers.length - cardsPerView ? 0 : prev + 1
    );
  }, [cardsPerView]);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "online":
        return isMobile ? "bg-green-500" : "bg-green-500 shadow-[0_0_8px_#22c55e]";
      case "busy":
        return isMobile ? "bg-amber-500" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
      case "away":
        return isMobile ? "bg-gray-500" : "bg-gray-500 shadow-[0_0_8px_#6b7280]";
      default:
        return "bg-gray-500";
    }
  }, [isMobile]);

  const getAvatarGradient = useCallback((index) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-red-600",
      "from-indigo-500 to-purple-600",
    ];
    return gradients[index % gradients.length];
  }, []);

  // Memoize pagination dots count
  const paginationCount = useMemo(() =>
    Math.max(1, teamMembers.length - cardsPerView + 1),
    [cardsPerView]
  );

  // Simplified transition for mobile
  const sliderTransition = isMobile
    ? { type: "tween", duration: 0.2 }
    : { type: "spring", stiffness: 300, damping: 30 };

  const cardWidth = isMobile ? "w-full" : "w-[calc(33.333%-11px)]";

  return (
    <motion.div
      className="holo-panel p-6 relative overflow-hidden"
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.25 : 0.5 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-center">
            <Users size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">Team Members</h3>
            <p className="text-xs text-gray-500 font-mono">
              {teamMembers.length} Active Members
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden" ref={sliderRef}>
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${currentIndex * (100 / cardsPerView + (isMobile ? 0 : 1.5))}%` }}
          transition={sliderTransition}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`flex-shrink-0 ${cardWidth}`}
              initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: isMobile ? index * 0.03 : index * 0.1 }}
            >
              <div className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full">
                {/* Avatar & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarGradient(index)} flex-center text-white font-bold text-lg shadow-lg`}
                    >
                      {member.initials}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(member.status)}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
                    {member.department}
                  </span>
                </div>

                {/* Info */}
                <h4 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-400 mb-3">{member.role}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.expertise.slice(0, 2).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                      +{member.expertise.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions - Hidden on mobile for performance */}
                {!isMobile && (
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail size={12} />
                      Contact
                    </motion.button>
                    <motion.button
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={14} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: paginationCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                ? "w-6 bg-cyan-400"
                : "w-2 bg-white/20 hover:bg-white/40"
              }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(TeamSlider);
