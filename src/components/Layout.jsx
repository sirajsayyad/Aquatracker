import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import Background from './Background';
import ParticleBackground from './ParticleBackground';
import CommandPalette from './CommandPalette';
import FloatingActionButton from './FloatingActionButton';

const Layout = () => {
  const location = useLocation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden text-white font-body selection:bg-cyan-500/30">
      <Background />
      <ParticleBackground particleCount={25} />
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 transition-all duration-300">
        <Header onCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full max-w-[1600px] mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Layout;

