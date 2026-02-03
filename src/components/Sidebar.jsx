import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Map as MapIcon,
  BarChart2,
  Bell,
  FileText,
  Settings,
  Droplets,
  Cpu,
  ChevronRight,
  Sparkles,
  X,
  Monitor,
  Shield,
  Globe,
  Zap,
  Database,
  Cloud,
  Smartphone,
  Lock,
  Sliders,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMobileNav } from "../context/MobileNavContext";

const Sidebar = () => {
  const { t } = useLanguage();
  const { closeMobileMenu, isMobile } = useMobileNav();
  const [showFeatures, setShowFeatures] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, labelKey: "commandCenter", path: "/" },
    { icon: Activity, labelKey: "liveMonitor", path: "/monitoring" },
    { icon: MapIcon, labelKey: "geoSpatial", path: "/map" },
    { icon: BarChart2, labelKey: "analytics", path: "/analytics" },
    { icon: Bell, labelKey: "alerts", path: "/alerts" },
    { icon: FileText, labelKey: "reports", path: "/reports" },
    { icon: Settings, labelKey: "config", path: "/settings" },
    { icon: Sliders, labelKey: "operatorMode", path: "/operator" },
  ];

  const features = [
    {
      icon: Monitor,
      title: "Command Center Dashboard",
      description:
        "Real-time water quality metrics with animated gauges and trend charts",
      color: "cyan",
    },
    {
      icon: Activity,
      title: "Live Monitoring",
      description:
        "Multi-station parameter comparison with live data streaming",
      color: "green",
    },
    {
      icon: MapIcon,
      title: "Geo-Spatial Mapping",
      description: "Interactive Leaflet maps with station locations and status",
      color: "blue",
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Data analytics, trends, and predictive insights",
      color: "purple",
    },
    {
      icon: Bell,
      title: "Alert Management",
      description: "Priority-based alerts with acknowledgment workflow",
      color: "red",
    },
    {
      icon: FileText,
      title: "Compliance Reports",
      description: "Automated reports with PDF, Excel, CSV export",
      color: "amber",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "2FA, SSO support, and role-based access control",
      color: "emerald",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for English, Hindi, and Marathi",
      color: "pink",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Live sensor data with instant threshold alerts",
      color: "yellow",
    },
    {
      icon: Database,
      title: "Data Export",
      description: "Export data in multiple formats for analysis",
      color: "indigo",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless cloud sync and backup capabilities",
      color: "sky",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile",
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
      green:
        "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
      blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
      purple:
        "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
      red: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
      amber:
        "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
      emerald:
        "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
      pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
      yellow:
        "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
      indigo:
        "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400",
      sky: "from-sky-500/20 to-sky-500/5 border-sky-500/30 text-sky-400",
      orange:
        "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400",
    };
    return colors[color] || colors.cyan;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="h-full w-[280px] flex flex-col relative z-20 shrink-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 12, 22, 0.98) 0%, rgba(5, 8, 15, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "5px 0 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Ambient Glow Effect */}
        <div className="absolute -right-20 top-20 w-40 h-[400px] bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute -right-10 bottom-20 w-32 h-[200px] bg-purple-500/5 blur-[80px] pointer-events-none" />

        {/* Brand Header */}
        <div className="h-[80px] flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={isMobile ? {} : { rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-40 animate-pulse-glow" />
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/30">
                <img
                  src="/logo.jpg"
                  alt="AquaTracker"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-wide font-display">
                {t("appName")}
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-mono">
                {t("enterpriseCore")}
              </p>
            </div>
          </div>
          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={closeMobileMenu}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <motion.nav
          className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <NavLink
                to={item.path}
                onClick={() => isMobile && closeMobileMenu()}
                className={({ isActive }) =>
                  `relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group mobile-nav-item ${isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0, 242, 255, 0.1) 0%, rgba(0, 242, 255, 0.05) 100%)",
                          borderLeft: "3px solid #00f2ff",
                          boxShadow: "inset 0 0 20px rgba(0, 242, 255, 0.05)",
                        }}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <item.icon
                      size={20}
                      className={`relative z-10 transition-all duration-300 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"
                        }`}
                      style={
                        isActive
                          ? {
                            filter:
                              "drop-shadow(0 0 8px rgba(0, 242, 255, 0.6))",
                          }
                          : {}
                      }
                    />

                    {/* Label */}
                    <span className="relative z-10 font-medium tracking-wide text-sm">
                      {item.labelKey ? t(item.labelKey) : item.label}
                    </span>

                    {/* Arrow for active */}
                    {isActive && (
                      <ChevronRight
                        size={14}
                        className="ml-auto text-cyan-400 relative z-10"
                      />
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}

          {/* Features Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => setShowFeatures(true)}
              className="relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group text-gray-400 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
              }}
            >
              <Sparkles
                size={20}
                className="relative z-10 text-purple-400 group-hover:text-purple-300 transition-colors"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))",
                }}
              />
              <span className="relative z-10 font-medium tracking-wide text-sm text-purple-300 group-hover:text-white">
                All Features
              </span>
              <ChevronRight
                size={14}
                className="ml-auto text-purple-400 relative z-10"
              />
            </motion.button>
          </motion.div>
        </motion.nav>

        {/* System Status Footer */}
        <div className="p-4 border-t border-white/5">
          <motion.div
            className="rounded-xl p-4 border border-white/5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))",
            }}
            whileHover={{ borderColor: "rgba(0, 242, 255, 0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                System Status
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Cpu size={14} className="text-cyan-400" />
              </motion.div>
            </div>
            <div className="flex items-center gap-3">
              <span className="status-dot status-online" />
              <span className="text-sm font-mono text-green-400 font-medium">
                ONLINE
              </span>
              <span className="text-[10px] text-gray-600 ml-auto font-mono">
                v2.4.3
              </span>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Features Modal */}
      <AnimatePresence>
        {showFeatures && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFeatures(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 12, 22, 0.98) 0%, rgba(15, 20, 35, 0.95) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 80px rgba(0, 0, 0, 0.8)",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Top Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500" />

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Sparkles size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                      AquaTracker Features
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enterprise Water Quality Monitoring Platform
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowFeatures(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Features Grid */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-br border ${getColorClasses(feature.color)} hover:scale-[1.02] transition-transform cursor-default`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getColorClasses(feature.color)} flex items-center justify-center shrink-0`}
                        >
                          <feature.icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="text-cyan-400 font-semibold">
                      AquaTracker v2.4.3
                    </span>{" "}
                    • Enterprise Core Edition
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
