import React, { createContext, useContext, useState, useEffect } from "react";

const MobileNavContext = createContext();

export const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within MobileNavProvider");
  }
  return context;
};

export const MobileNavProvider = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
    }

    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [isMobileMenuOpen]);

  const value = {
    isMobileMenuOpen,
    setMobileMenuOpen,
    isMobile,
    toggleMobileMenu: () => setMobileMenuOpen((prev) => !prev),
    closeMobileMenu: () => setMobileMenuOpen(false),
  };

  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
};

export default MobileNavContext;
