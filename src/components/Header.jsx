import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Globe,
  User,
  Command,
  Settings,
  LogOut,
  ChevronDown,
  Check,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useMobileNav } from "../context/MobileNavContext";

const Header = ({ onCommandPalette }) => {
  const navigate = useNavigate();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { toggleMobileMenu, isMobile } = useMobileNav();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  // Searchable items
  const searchableItems = [
    // Pages
    { id: 1, type: "page", title: "Command Center", path: "/", keywords: ["dashboard", "home", "overview"] },
    { id: 2, type: "page", title: "Live Monitor", path: "/monitoring", keywords: ["live", "realtime", "parameters"] },
    { id: 3, type: "page", title: "Geo-Spatial Map", path: "/map", keywords: ["map", "location", "stations"] },
    { id: 4, type: "page", title: "Analytics", path: "/analytics", keywords: ["data", "charts", "analysis"] },
    { id: 5, type: "page", title: "Alerts", path: "/alerts", keywords: ["notifications", "warnings", "critical"] },
    { id: 6, type: "page", title: "Reports", path: "/reports", keywords: ["documents", "export", "pdf"] },
    { id: 7, type: "page", title: "Settings", path: "/settings", keywords: ["config", "preferences"] },
    { id: 8, type: "page", title: "Operator Mode", path: "/operator", keywords: ["control", "pumps", "valves"] },
    // Parameters
    { id: 10, type: "parameter", title: "pH Level", path: "/monitoring", keywords: ["ph", "acidity", "alkaline"] },
    { id: 11, type: "parameter", title: "Turbidity", path: "/monitoring", keywords: ["clarity", "ntu", "particles"] },
    { id: 12, type: "parameter", title: "Dissolved Oxygen", path: "/monitoring", keywords: ["do", "oxygen", "o2"] },
    { id: 13, type: "parameter", title: "Temperature", path: "/monitoring", keywords: ["temp", "celsius", "heat"] },
    { id: 14, type: "parameter", title: "TDS", path: "/monitoring", keywords: ["dissolved solids", "ppm"] },
    { id: 15, type: "parameter", title: "COD", path: "/monitoring", keywords: ["chemical oxygen demand"] },
    { id: 16, type: "parameter", title: "BOD", path: "/monitoring", keywords: ["biological oxygen demand"] },
    // Stations
    { id: 20, type: "station", title: "Station A1", path: "/map", keywords: ["primary", "intake"] },
    { id: 21, type: "station", title: "Station A3", path: "/map", keywords: ["treatment"] },
    { id: 22, type: "station", title: "Station C1", path: "/map", keywords: ["outlet"] },
    { id: 23, type: "station", title: "Station D4", path: "/map", keywords: ["reservoir"] },
    { id: 24, type: "station", title: "Station E2", path: "/map", keywords: ["sensor hub"] },
    // Actions
    { id: 30, type: "action", title: "Generate Report", path: "/reports", keywords: ["export", "pdf", "download"] },
    { id: 31, type: "action", title: "View Alerts", path: "/alerts", keywords: ["notifications", "warnings"] },
    { id: 32, type: "action", title: "System Settings", path: "/settings", keywords: ["config", "preferences"] },
  ];

  // Filter search results
  const searchResults = searchQuery.trim()
    ? searchableItems.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.keywords.some(k => k.toLowerCase().includes(query))
      );
    }).slice(0, 8)
    : [];

  // Handle search item click
  const handleSearchSelect = (item) => {
    navigate(item.path);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  // Get icon for result type
  const getResultIcon = (type) => {
    switch (type) {
      case "page": return "📄";
      case "parameter": return "📊";
      case "station": return "📍";
      case "action": return "⚡";
      default: return "🔗";
    }
  };

  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Turbidity spike predicted in 2 hours",
      time: "5m ago",
    },
    {
      id: 2,
      type: "success",
      message: "System backup completed successfully",
      time: "1h ago",
    },
    {
      id: 3,
      type: "info",
      message: "New compliance report available",
      time: "3h ago",
    },
  ];

  return (
    <header
      className={`flex items-center justify-between px-8 py-4 z-50 sticky top-0 shrink-0 ${isMobile ? "mobile-header" : ""}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(5, 8, 15, 0.9) 0%, rgba(5, 8, 15, 0.7) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Mobile Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          className="mobile-menu-btn mr-3"
          onClick={toggleMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Search Bar - Hidden on mobile, shown on desktop */}
      <motion.div
        className={`relative ${isMobile ? "mobile-search-hidden" : "w-[400px]"}`}
        animate={{ scale: isSearchFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow Effect */}
        <AnimatePresence>
          {isSearchFocused && (
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <div
          className={`relative flex items-center rounded-full px-5 py-3 transition-all duration-300 ${isSearchFocused
              ? "bg-white/10 border-cyan-500/50"
              : "bg-white/5 border-white/10 hover:bg-white/8"
            }`}
          style={{ border: "1px solid" }}
        >
          <Search
            size={16}
            className={`mr-3 transition-colors ${isSearchFocused ? "text-cyan-400" : "text-gray-400"
              }`}
          />
          <input
            type="text"
            placeholder="Search parameters, stations, logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500 font-body"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchQuery("");
                setIsSearchFocused(false);
                e.target.blur();
              }
            }}
          />
          <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-black/30 px-2 py-1 rounded-md border border-white/5 font-mono">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isSearchFocused && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-panel p-2 rounded-xl z-50 max-h-[400px] overflow-y-auto"
            >
              <div className="text-[10px] text-gray-500 px-3 py-2 font-mono uppercase tracking-wider">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSearchSelect(item)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="text-lg">{getResultIcon(item.type)}</span>
                  <div className="flex-1">
                    <span className="text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-gray-500 ml-2 capitalize">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">
                    {item.path}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        <AnimatePresence>
          {isSearchFocused && searchQuery.trim() && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-panel p-4 rounded-xl z-50 text-center"
            >
              <p className="text-sm text-gray-400">No results found for "{searchQuery}"</p>
              <p className="text-xs text-gray-600 mt-1">Try searching for pages, parameters, or stations</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        {/* Quick Actions */}
        <div className={`flex items-center ${isMobile ? "gap-2" : "gap-3"}`}>
          {/* Theme Toggle */}
          <motion.button
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Language Selector - Hidden on small mobile */}
          <div className={`relative ${isMobile ? "mobile-hidden" : ""}`}>
            <motion.button
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLanguage(!showLanguage)}
            >
              <Globe size={18} />
            </motion.button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {showLanguage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-44 glass-panel p-2 overflow-hidden z-50"
                >
                  <div className="text-xs text-gray-500 px-3 py-2 font-mono uppercase tracking-wide">
                    {t("language")}
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguage(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${language === lang.code
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-gray-300 hover:bg-white/5"
                        }`}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] flex-center">
                <span className="text-[8px] font-bold text-white">3</span>
              </span>
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 top-14 glass-panel p-0 overflow-hidden z-50 ${isMobile ? "w-72 -right-2" : "w-80"}`}
                >
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <span className="font-bold text-sm">Notifications</span>
                    <button className="text-xs text-cyan-400 hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => {
                          setShowNotifications(false);
                          navigate("/alerts");
                        }}
                      >
                        <p className="text-sm text-white mb-1">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-gray-500">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-white/5">
                    <button
                      className="text-xs text-cyan-400 hover:underline"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/alerts");
                      }}
                    >
                      View All
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className={`h-8 w-px bg-white/10 ${isMobile ? "hidden" : ""}`} />

        {/* Profile */}
        <div className={`relative ${isMobile ? "mobile-profile-compact" : ""}`}>
          <motion.div
            className="flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={() => setShowProfile(!showProfile)}
            whileHover={{ scale: 1.02 }}
          >
            <div
              className={`text-right profile-text ${isMobile ? "hidden" : "block"}`}
            >
              <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Admin Commander
              </p>
              <p className="text-[10px] text-gray-500 tracking-wider font-mono">
                PCB LEVEL 5
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex-center overflow-hidden">
                <User size={18} className="text-gray-300" />
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 group-hover:text-white transition-colors ${isMobile ? "hidden" : ""}`}
            />
          </motion.div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-16 w-56 glass-panel p-2 overflow-hidden z-50"
              >
                {/* Show name on mobile in dropdown */}
                {isMobile && (
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-sm font-semibold text-white">
                      Admin Commander
                    </p>
                    <p className="text-[10px] text-gray-500 tracking-wider font-mono">
                      PCB LEVEL 5
                    </p>
                  </div>
                )}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                >
                  <Settings size={16} className="text-gray-400" />
                  <span className="text-sm">Settings</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-400"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/login");
                  }}
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click Outside Handler */}
      {(showNotifications || showProfile || showLanguage) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
            setShowLanguage(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
