import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useMobilePerformance from "../hooks/useMobilePerformance";

const ParticleBackground = ({ particleCount = 30, mobileParticleCount = 8 }) => {
  const { isMobile, reduceMotion, performanceTier } = useMobilePerformance();

  // Skip rendering entirely if user prefers reduced motion
  if (reduceMotion) return null;

  // Adjust particle count based on device performance
  const actualParticleCount = useMemo(() => {
    if (performanceTier === 'minimal') return 0;
    if (performanceTier === 'low') return mobileParticleCount;
    if (performanceTier === 'medium') return Math.floor(particleCount / 2);
    return particleCount;
  }, [performanceTier, particleCount, mobileParticleCount]);

  const particles = useMemo(() => {
    return [...Array(actualParticleCount)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [actualParticleCount]);

  // Simplified animation for mobile - shorter duration, no infinite repeat for orbs
  const orbAnimationConfig = isMobile
    ? { duration: 0, repeat: 0 }
    : { duration: 8, repeat: Infinity, ease: "easeInOut" };

  const bubbleCount = isMobile ? 0 : 8; // Disable bubbles on mobile

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs - Simplified on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 242, 255, 0.3) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={orbAnimationConfig}
            />
          </div>

          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-15">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(189, 0, 255, 0.3) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                ...orbAnimationConfig,
                delay: 2,
              }}
            />
          </div>
        </>
      )}

      {/* Static gradient orbs for mobile - no animation */}
      {isMobile && (
        <>
          <div
            className="absolute top-0 right-0 w-[300px] h-[300px] opacity-10 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 242, 255, 0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[250px] h-[250px] opacity-10 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(189, 0, 255, 0.2) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Water Droplet Particles - Reduced on mobile */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(0, 242, 255, ${particle.opacity}), rgba(0, 180, 200, ${particle.opacity * 0.5}))`,
            boxShadow: isMobile ? 'none' : `0 0 ${particle.size * 2}px rgba(0, 242, 255, ${particle.opacity * 0.5})`,
          }}
          initial={{ y: `${particle.y}vh`, opacity: 0 }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
            opacity: [0, particle.opacity, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: isMobile ? particle.duration * 1.5 : particle.duration, // Slower on mobile = less CPU
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating Bubbles - Disabled on mobile */}
      {[...Array(bubbleCount)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full border border-cyan-500/20"
          style={{
            width: 20 + i * 5,
            height: 20 + i * 5,
            left: `${10 + i * 12}%`,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Grid Pattern Overlay - Static, no performance impact */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default React.memo(ParticleBackground);
