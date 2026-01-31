import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    LayoutDashboard,
    Activity,
    Map as MapIcon,
    BarChart2,
    Bell,
    FileText,
    Settings,
    Command,
    ArrowRight,
    Zap,
    Moon,
    Sun,
    Download,
    RefreshCw,
    X
} from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const commands = [
        // Navigation
        { id: 'nav-dashboard', category: 'Navigation', icon: LayoutDashboard, label: 'Go to Dashboard', action: () => navigate('/') },
        { id: 'nav-monitoring', category: 'Navigation', icon: Activity, label: 'Go to Live Monitor', action: () => navigate('/monitoring') },
        { id: 'nav-map', category: 'Navigation', icon: MapIcon, label: 'Go to Map View', action: () => navigate('/map') },
        { id: 'nav-analytics', category: 'Navigation', icon: BarChart2, label: 'Go to Analytics', action: () => navigate('/analytics') },
        { id: 'nav-alerts', category: 'Navigation', icon: Bell, label: 'Go to Alerts', action: () => navigate('/alerts') },
        { id: 'nav-reports', category: 'Navigation', icon: FileText, label: 'Go to Reports', action: () => navigate('/reports') },
        { id: 'nav-settings', category: 'Navigation', icon: Settings, label: 'Go to Settings', action: () => navigate('/settings') },
        // Actions
        { id: 'action-refresh', category: 'Actions', icon: RefreshCw, label: 'Refresh Data', action: () => window.location.reload() },
        { id: 'action-export', category: 'Actions', icon: Download, label: 'Export Report', action: () => navigate('/reports') },
        {
            id: 'action-fullscreen', category: 'Actions', icon: Zap, label: 'Toggle Fullscreen', action: () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
            }
        },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    const groupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {});

    const flatCommands = Object.values(groupedCommands).flat();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
        setSelectedIndex(0);
    }, [isOpen]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, flatCommands.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && flatCommands[selectedIndex]) {
            e.preventDefault();
            flatCommands[selectedIndex].action();
            onClose();
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [flatCommands, selectedIndex, onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    // Global keyboard shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                } else {
                    // Parent component handles opening
                }
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Palette */}
                    <motion.div
                        className="fixed top-[15%] left-1/2 w-[90%] max-w-[600px] z-[101]"
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div
                            className="rounded-2xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15, 20, 35, 0.98), rgba(8, 12, 22, 0.98))',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 25px 80px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 255, 0.1)',
                            }}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-4 p-4 border-b border-white/5">
                                <Search size={20} className="text-cyan-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                                    placeholder="Search commands..."
                                    className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
                                />
                                <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/10">
                                    <span>ESC</span>
                                </div>
                            </div>

                            {/* Commands List */}
                            <div className="max-h-[400px] overflow-y-auto p-2">
                                {Object.entries(groupedCommands).map(([category, cmds]) => (
                                    <div key={category} className="mb-2">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest px-3 py-2 font-mono">
                                            {category}
                                        </div>
                                        {cmds.map((cmd) => {
                                            const globalIndex = flatCommands.findIndex(c => c.id === cmd.id);
                                            const isSelected = globalIndex === selectedIndex;

                                            return (
                                                <motion.button
                                                    key={cmd.id}
                                                    onClick={() => { cmd.action(); onClose(); }}
                                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isSelected
                                                            ? 'bg-cyan-500/10 text-cyan-400'
                                                            : 'text-gray-300 hover:bg-white/5'
                                                        }`}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <cmd.icon size={18} className={isSelected ? 'text-cyan-400' : 'text-gray-500'} />
                                                    <span className="flex-1 text-left text-sm font-medium">{cmd.label}</span>
                                                    {isSelected && <ArrowRight size={14} className="text-cyan-400" />}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                ))}

                                {flatCommands.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <Command size={32} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No commands found</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <Command size={10} />
                                    <span>K to toggle</span>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
