import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    X,
    Bell,
    FileText,
    Download,
    RefreshCw,
    Settings,
    Zap
} from 'lucide-react';

const FloatingActionButton = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { icon: Bell, label: 'New Alert', color: '#f59e0b', action: () => navigate('/alerts') },
        { icon: FileText, label: 'Generate Report', color: '#22c55e', action: () => navigate('/reports') },
        { icon: Download, label: 'Export Data', color: '#3b82f6', action: () => navigate('/reports') },
        { icon: RefreshCw, label: 'Refresh All', color: '#8b5cf6', action: () => window.location.reload() },
        { icon: Zap, label: 'Quick Actions', color: '#ec4899', action: () => navigate('/settings') },
    ];

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-8 right-8 z-50 mobile-fab mobile-safe-bottom">\r
            {/* Action Items */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Actions */}
                        <div className="absolute bottom-16 right-0 flex flex-col-reverse gap-3">
                            {actions.map((action, index) => (
                                <motion.div
                                    key={action.label}
                                    className="flex items-center gap-3 group"
                                    initial={{ opacity: 0, scale: 0, x: 50 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: 0,
                                        transition: { delay: index * 0.05 }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0,
                                        x: 50,
                                        transition: { delay: (actions.length - index) * 0.03 }
                                    }}
                                >
                                    {/* Label */}
                                    <motion.span
                                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        {action.label}
                                    </motion.span>

                                    {/* Button */}
                                    <motion.button
                                        onClick={() => { action.action(); setIsOpen(false); }}
                                        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform"
                                        style={{
                                            background: `linear-gradient(135deg, ${action.color}, ${action.color}99)`,
                                            boxShadow: `0 4px 20px ${action.color}40`,
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <action.icon size={20} className="text-white" />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={toggleOpen}
                className="w-14 h-14 rounded-full flex items-center justify-center relative"
                style={{
                    background: isOpen
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'linear-gradient(135deg, #00f2ff, #0ea5e9)',
                    boxShadow: isOpen
                        ? '0 4px 30px rgba(239, 68, 68, 0.4)'
                        : '0 4px 30px rgba(0, 242, 255, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {/* Pulse Ring */}
                {!isOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid rgba(0, 242, 255, 0.5)' }}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 45, opacity: 0 }}
                        >
                            <X size={24} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -45, opacity: 0 }}
                        >
                            <Plus size={24} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingActionButton;
