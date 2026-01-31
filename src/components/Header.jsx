import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe, User, Command, Settings, LogOut, ChevronDown, Check, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onCommandPalette }) => {
    const navigate = useNavigate();
    const { language, setLanguage, t, availableLanguages } = useLanguage();
    const { theme, toggleTheme, isDark } = useTheme();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);

    const notifications = [
        { id: 1, type: 'warning', message: 'Turbidity spike predicted in 2 hours', time: '5m ago' },
        { id: 2, type: 'success', message: 'System backup completed successfully', time: '1h ago' },
        { id: 3, type: 'info', message: 'New compliance report available', time: '3h ago' },
    ];

    return (
        <header
            className="flex items-center justify-between px-8 py-4 z-50 sticky top-0 shrink-0"
            style={{
                background: 'linear-gradient(180deg, rgba(5, 8, 15, 0.9) 0%, rgba(5, 8, 15, 0.7) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
        >
            {/* Search Bar */}
            <motion.div
                className="relative w-[400px]"
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
                        ? 'bg-white/10 border-cyan-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/8'
                        }`}
                    style={{ border: '1px solid' }}
                >
                    <Search
                        size={16}
                        className={`mr-3 transition-colors ${isSearchFocused ? 'text-cyan-400' : 'text-gray-400'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Search parameters, stations, logs..."
                        className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500 font-body"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-black/30 px-2 py-1 rounded-md border border-white/5 font-mono">
                        <Command size={10} />
                        <span>K</span>
                    </div>
                </div>
            </motion.div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
                {/* Quick Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <motion.button
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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

                    {/* Language Selector */}
                    <div className="relative">
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
                                        {t('language')}
                                    </div>
                                    {availableLanguages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setShowLanguage(false); }}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${language === lang.code
                                                ? 'bg-cyan-500/10 text-cyan-400'
                                                : 'text-gray-300 hover:bg-white/5'
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
                                    className="absolute right-0 top-14 w-80 glass-panel p-0 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                                        <span className="font-bold text-sm">Notifications</span>
                                        <button className="text-xs text-cyan-400 hover:underline">Mark all read</button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                                onClick={() => { setShowNotifications(false); navigate('/alerts'); }}
                                            >
                                                <p className="text-sm text-white mb-1">{notif.message}</p>
                                                <span className="text-[10px] text-gray-500">{notif.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center border-t border-white/5">
                                        <button
                                            className="text-xs text-cyan-400 hover:underline"
                                            onClick={() => { setShowNotifications(false); navigate('/alerts'); }}
                                        >
                                            View All
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-white/10" />

                {/* Profile */}
                <div className="relative">
                    <motion.div
                        className="flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                        onClick={() => setShowProfile(!showProfile)}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                Admin Commander
                            </p>
                            <p className="text-[10px] text-gray-500 tracking-wider font-mono">PCB LEVEL 5</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex-center overflow-hidden">
                                <User size={18} className="text-gray-300" />
                            </div>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                    </motion.div>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-16 w-56 glass-panel p-2 overflow-hidden"
                            >
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                                    onClick={() => { setShowProfile(false); navigate('/settings'); }}
                                >
                                    <Settings size={16} className="text-gray-400" />
                                    <span className="text-sm">Settings</span>
                                </button>
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-400"
                                    onClick={() => { setShowProfile(false); navigate('/login'); }}
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
