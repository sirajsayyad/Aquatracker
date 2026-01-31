import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import Background from './Background';
import ParticleBackground from './ParticleBackground';
import CommandPalette from './CommandPalette';
import FloatingActionButton from './FloatingActionButton';
import { MobileNavProvider, useMobileNav } from '../context/MobileNavContext';

const LayoutContent = () => {
  const location = useLocation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { isMobileMenuOpen, closeMobileMenu, isMobile } = useMobileNav();

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      // Close mobile menu on Escape
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div className="flex h-screen w-screen overflow-hidden text-white font-body selection:bg-cyan-500/30">
      <Background />
      <ParticleBackground particleCount={isMobile ? 10 : 25} />

      {/* Mobile Backdrop Overlay - Only renders on mobile */}
      {isMobile && (
        <div
          className={`mobile-backdrop ${isMobileMenuOpen ? 'visible' : ''}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Desktop: always visible, Mobile: off-canvas drawer */}
      <div className={`${isMobile ? `mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}` : 'desktop-sidebar'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col relative z-10 transition-all duration-300">
        <Header onCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className={`flex-1 p-6 overflow-y-auto overflow-x-hidden no-scrollbar ${isMobile ? 'mobile-content' : ''}`}>
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

const Layout = () => {
  return (
    <MobileNavProvider>
      <LayoutContent />
    </MobileNavProvider>
  );
};

export default Layout;
