import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    AlertTriangle,
    AlertOctagon,
    CheckCircle,
    Info,
    Filter,
    Search,
    MoreVertical,
    Clock,
    MapPin,
    X,
    Check,
    Trash2,
    Eye
} from 'lucide-react';

const Alerts = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlert, setSelectedAlert] = useState(null);

    const alerts = [
        { id: 1, type: 'critical', title: 'pH Level Critical', message: 'Station C1 pH level exceeded 9.5. Immediate action required.', time: '2 min ago', station: 'Station C1', status: 'active', priority: 'high' },
        { id: 2, type: 'warning', title: 'Turbidity Approaching Threshold', message: 'Station A3 turbidity at 3.8 NTU, approaching warning level of 4.0 NTU.', time: '15 min ago', station: 'Station A3', status: 'active', priority: 'medium' },
        { id: 3, type: 'warning', title: 'Scheduled Maintenance Due', message: 'Pump Unit B2 maintenance scheduled for tomorrow at 10:00 AM.', time: '1 hour ago', station: 'Pump B2', status: 'acknowledged', priority: 'low' },
        { id: 4, type: 'success', title: 'Issue Resolved', message: 'COD levels at Station D4 have returned to normal operating range.', time: '2 hours ago', station: 'Station D4', status: 'resolved', priority: 'low' },
        { id: 5, type: 'info', title: 'System Update', message: 'New firmware update available for flow sensors. Schedule update during off-peak hours.', time: '3 hours ago', station: 'All Stations', status: 'active', priority: 'low' },
        { id: 6, type: 'critical', title: 'Sensor Malfunction', message: 'DO sensor at Station E2 reporting erratic readings. Manual verification required.', time: '4 hours ago', station: 'Station E2', status: 'investigating', priority: 'high' },
        { id: 7, type: 'warning', title: 'Power Fluctuation', message: 'Minor power fluctuation detected at Station A1. Backup systems activated.', time: '5 hours ago', station: 'Station A1', status: 'resolved', priority: 'medium' },
        { id: 8, type: 'info', title: 'Compliance Report Ready', message: 'Monthly compliance report for December 2025 is ready for review.', time: 'Yesterday', station: 'System', status: 'active', priority: 'low' },
    ];

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical': return <AlertOctagon size={18} className="text-red-400" />;
            case 'warning': return <AlertTriangle size={18} className="text-amber-400" />;
            case 'success': return <CheckCircle size={18} className="text-green-400" />;
            default: return <Info size={18} className="text-cyan-400" />;
        }
    };

    const getAlertColor = (type) => {
        switch (type) {
            case 'critical': return 'border-l-red-500 bg-red-500/5';
            case 'warning': return 'border-l-amber-500 bg-amber-500/5';
            case 'success': return 'border-l-green-500 bg-green-500/5';
            default: return 'border-l-cyan-500 bg-cyan-500/5';
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-red-500/10 text-red-400 border-red-500/30',
            acknowledged: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            investigating: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
            resolved: 'bg-green-500/10 text-green-400 border-green-500/30',
        };
        return styles[status] || styles.active;
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesFilter = filter === 'all' || alert.type === filter || alert.status === filter;
        const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const alertCounts = {
        all: alerts.length,
        critical: alerts.filter(a => a.type === 'critical').length,
        warning: alerts.filter(a => a.type === 'warning').length,
        active: alerts.filter(a => a.status === 'active').length,
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            className="space-y-6 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex-center relative">
                        <Bell size={24} className="text-red-400" />
                        {alertCounts.active > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex-center text-white">
                                {alertCounts.active}
                            </span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-display">Alert Management</h1>
                        <p className="text-sm text-gray-500 font-mono">{alerts.length} total alerts</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-[300px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search alerts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {[
                    { key: 'all', label: 'All', count: alertCounts.all },
                    { key: 'critical', label: 'Critical', count: alertCounts.critical },
                    { key: 'warning', label: 'Warnings', count: alertCounts.warning },
                    { key: 'active', label: 'Active', count: alertCounts.active },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === tab.key
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        {tab.label}
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/30">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* Alerts List */}
            <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredAlerts.map((alert) => (
                    <motion.div
                        key={alert.id}
                        variants={itemVariants}
                        className={`holo-panel p-5 border-l-3 ${getAlertColor(alert.type)} cursor-pointer group`}
                        onClick={() => setSelectedAlert(alert)}
                        whileHover={{ x: 4 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {alert.title}
                                    </h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(alert.status)}`}>
                                        {alert.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{alert.message}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> {alert.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} /> {alert.station}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.button
                                    className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex-center text-green-400"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); }}
                                >
                                    <Check size={14} />
                                </motion.button>
                                <motion.button
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); }}
                                >
                                    <Eye size={14} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredAlerts.length === 0 && (
                <div className="holo-panel p-12 text-center">
                    <Bell size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">No alerts found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
                </div>
            )}

            {/* Alert Detail Modal */}
            <AnimatePresence>
                {selectedAlert && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAlert(null)}
                    >
                        <motion.div
                            className="holo-panel p-6 max-w-lg w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getAlertIcon(selectedAlert.type)}
                                    <h3 className="text-xl font-bold font-display">{selectedAlert.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedAlert(null)}
                                    className="w-8 h-8 rounded-lg bg-white/5 flex-center text-gray-400 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-gray-400 mb-4">{selectedAlert.message}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <span className="flex items-center gap-1"><Clock size={14} /> {selectedAlert.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {selectedAlert.station}</span>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-medium hover:bg-green-500/20 transition-colors">
                                    Mark Resolved
                                </button>
                                <button className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                                    Acknowledge
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Alerts;
