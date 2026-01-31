import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  ExternalLink,
} from "lucide-react";
import { teamMembers } from "../data/mockData";

const TeamSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const cardsPerView = 3;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? teamMembers.length - cardsPerView : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= teamMembers.length - cardsPerView ? 0 : prev + 1,
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500 shadow-[0_0_8px_#22c55e]";
      case "busy":
        return "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
      case "away":
        return "bg-gray-500 shadow-[0_0_8px_#6b7280]";
      default:
        return "bg-gray-500";
    }
  };

  const getAvatarGradient = (index) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-red-600",
      "from-indigo-500 to-purple-600",
    ];
    return gradients[index % gradients.length];
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

      {/* Slider Container */}
      <div className="relative overflow-hidden" ref={sliderRef}>
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${currentIndex * (100 / cardsPerView + 1.5)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="flex-shrink-0 w-[calc(33.333%-11px)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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

                {/* Actions */}
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: teamMembers.length - cardsPerView + 1 }).map(
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-cyan-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ),
        )}
      </div>
    </motion.div>
  );
};

export default TeamSlider;
