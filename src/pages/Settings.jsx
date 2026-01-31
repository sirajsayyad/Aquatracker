import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Users,
  Bell,
  Shield,
  Database,
  Wifi,
  Moon,
  Sun,
  Globe,
  Key,
  Save,
  RefreshCw,
  ChevronRight,
  Monitor,
  Smartphone,
  Mail,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    autoRefresh: true,
    refreshInterval: 30,
    language: "en",
    timezone: "UTC+5:30",
    dataRetention: 90,
    twoFactor: true,
  });

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "team", label: "Team Members", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data Management", icon: Database },
    { id: "integrations", label: "Integrations", icon: Wifi },
  ];

  const teamMembers = [
    {
      name: "Shweta Kore",
      role: "Project Lead",
      initials: "SK",
      status: "online",
    },
    {
      name: "Pratiksha Sawant",
      role: "Frontend Developer",
      initials: "PS",
      status: "online",
    },
    {
      name: "Rutuja Veer",
      role: "Backend Developer",
      initials: "RV",
      status: "online",
    },
    {
      name: "Sakshi Patil",
      role: "UI/UX Designer",
      initials: "SP",
      status: "busy",
    },
    {
      name: "Uday Pawar",
      role: "Data Analyst",
      initials: "UP",
      status: "online",
    },
    {
      name: "Siraj Sayyad",
      role: "Full Stack Developer",
      initials: "SS",
      status: "online",
    },
  ];

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const renderToggle = (key, enabled) => (
    <motion.button
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-cyan-500" : "bg-gray-700"}`}
      onClick={() => handleToggle(key)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ left: enabled ? "28px" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.darkMode ? (
                    <Moon size={20} className="text-purple-400" />
                  ) : (
                    <Sun size={20} className="text-amber-400" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white">Dark Mode</h4>
                    <p className="text-xs text-gray-500">
                      Use dark theme for the interface
                    </p>
                  </div>
                </div>
                {renderToggle("darkMode", settings.darkMode)}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} className="text-cyan-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Auto Refresh
                    </h4>
                    <p className="text-xs text-gray-500">
                      Automatically refresh dashboard data
                    </p>
                  </div>
                </div>
                {renderToggle("autoRefresh", settings.autoRefresh)}
              </div>
              {settings.autoRefresh && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <label className="text-xs text-gray-500 block mb-2">
                    Refresh Interval
                  </label>
                  <select
                    value={settings.refreshInterval}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        refreshInterval: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                  </select>
                </div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-green-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Language & Region
                  </h4>
                  <p className="text-xs text-gray-500">
                    Set your preferred language and timezone
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-2">
                    Language
                  </label>
                  <select className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50">
                    <option value="UTC+5:30">UTC+5:30 (IST)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "notifications":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                key: "notifications",
                icon: Bell,
                title: "Push Notifications",
                desc: "Receive in-app notifications",
              },
              {
                key: "emailAlerts",
                icon: Mail,
                title: "Email Alerts",
                desc: "Receive alert emails for critical issues",
              },
              {
                key: "smsAlerts",
                icon: Smartphone,
                title: "SMS Alerts",
                desc: "Receive SMS for emergency alerts",
              },
            ].map((item) => (
              <motion.div
                key={item.key}
                variants={itemVariants}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-cyan-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  {renderToggle(item.key, settings[item.key])}
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "security":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-xs text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                {renderToggle("twoFactor", settings.twoFactor)}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} className="text-green-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Change Password
                  </h4>
                  <p className="text-xs text-gray-500">
                    Update your account password
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                  onClick={() => alert("Password updated successfully!")}
                >
                  Update Password
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Monitor size={20} className="text-purple-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Active Sessions
                  </h4>
                  <p className="text-xs text-gray-500">
                    Manage your active login sessions
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                  <div>
                    <p className="text-sm text-white">Windows PC - Chrome</p>
                    <p className="text-xs text-gray-500">Current session</p>
                  </div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                  <div>
                    <p className="text-sm text-white">iPhone - Safari</p>
                    <p className="text-xs text-gray-500">
                      Last active: 2 hours ago
                    </p>
                  </div>
                  <button
                    className="text-xs text-red-400 hover:underline"
                    onClick={() => alert("Session revoked!")}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "data":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Database size={20} className="text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Data Retention
                  </h4>
                  <p className="text-xs text-gray-500">
                    Set how long to keep historical data
                  </p>
                </div>
              </div>
              <select
                value={settings.dataRetention}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    dataRetention: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
              >
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={180}>6 months</option>
                <option value={365}>1 year</option>
              </select>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h4 className="text-sm font-bold text-white mb-4">
                Storage Usage
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Sensor Data</span>
                    <span className="text-white">2.4 GB / 5 GB</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: "48%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Reports</span>
                    <span className="text-white">0.8 GB / 2 GB</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Logs</span>
                    <span className="text-white">1.2 GB / 3 GB</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "integrations":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                name: "SCADA System",
                status: "connected",
                desc: "Real-time sensor integration",
              },
              {
                name: "Weather API",
                status: "connected",
                desc: "Weather data for predictions",
              },
              {
                name: "SMS Gateway",
                status: "disconnected",
                desc: "SMS alert delivery",
              },
              {
                name: "Cloud Backup",
                status: "connected",
                desc: "Automated data backup",
              },
            ].map((integration, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex-center ${integration.status === "connected" ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}
                  >
                    <Wifi
                      size={18}
                      className={
                        integration.status === "connected"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {integration.name}
                    </h4>
                    <p className="text-xs text-gray-500">{integration.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${integration.status === "connected" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                  >
                    {integration.status}
                  </span>
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "team":
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} className="text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Project Team</h4>
                  <p className="text-xs text-gray-500">
                    AquaTracker development team
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {member.initials}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                          member.status === "online"
                            ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                            : member.status === "busy"
                              ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                              : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-600 group-hover:text-cyan-400 transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gray-500/10 border border-gray-500/30 flex-center">
          <SettingsIcon size={24} className="text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display">System Settings</h1>
          <p className="text-sm text-gray-500 font-mono">
            Configure your preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
              }`}
              whileHover={{ x: 4 }}
            >
              <tab.icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </motion.button>
          ))}

          {/* Save Button */}
          <motion.button
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 text-white font-medium mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("Settings saved successfully!")}
          >
            <Save size={16} />
            Save Changes
          </motion.button>
        </div>

        {/* Content */}
        <div key={activeTab} className="lg:col-span-3 holo-panel p-6">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
