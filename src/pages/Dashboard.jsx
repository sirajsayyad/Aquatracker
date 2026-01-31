import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { waterQualityTrends, liveParameters } from '../data/mockData';
import Gauge from '../components/Gauge';
import TeamSlider from '../components/TeamSlider';
import AlertsPanel from '../components/AlertsPanel';
import FeaturesSlider from '../components/FeaturesSlider';
import {
    AlertTriangle,
    CheckCircle,
    Activity,
    TrendingUp,
    TrendingDown,
    Zap,
    Waves,
    Droplets,
    ThermometerSun,
    Wind,
    BarChart3,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('8H');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <motion.div
            className="space-y-6 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* === TOP SECTION: KPI CARDS === */}
            <div className="grid grid-cols-12 gap-6 mobile-grid-cols-1">
                {/* Main WQI Card */}
                <motion.div
                    className="col-span-12 lg:col-span-4 holo-panel p-6 relative overflow-visible"
                    variants={itemVariants}
                >
                    {/* Ambient Glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full" />

                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Droplets size={16} className="text-cyan-400" />
                                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                                        Water Quality Index
                                    </span>
                                </div>
                                <motion.div
                                    className="text-6xl font-bold font-display text-white"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                    style={{ textShadow: '0 0 40px rgba(0, 242, 255, 0.4)' }}
                                >
                                    92.4
                                </motion.div>
                            </div>

                            {/* Circular Progress */}
                            <div className="relative w-20 h-20 flex-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r="35"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="6"
                                    />
                                    <motion.circle
                                        cx="40"
                                        cy="40"
                                        r="35"
                                        fill="none"
                                        stroke="#00f2ff"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={220}
                                        initial={{ strokeDashoffset: 220 }}
                                        animate={{ strokeDashoffset: 17 }}
                                        transition={{ duration: 1.5, ease: 'easeOut' }}
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(0, 242, 255, 0.6))' }}
                                    />
                                </svg>
                                <span className="absolute text-lg font-bold text-cyan-400">A+</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                                <TrendingUp size={14} />
                                <span className="text-sm font-mono font-medium">+5.2%</span>
                            </div>
                            <span className="text-xs text-gray-500">vs 1 hour ago</span>
                        </div>
                    </div>
                </motion.div>

                {/* Compliance Card */}
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-4 holo-panel p-6 relative overflow-hidden"
                    variants={itemVariants}
                    style={{ borderLeft: '3px solid #22c55e' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle size={16} className="text-green-400" />
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                Compliance
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold font-display text-white mb-1">
                            Release Authorized
                        </h2>
                        <p className="text-sm text-gray-400 mb-4">All parameters within limits</p>

                        <div className="flex items-center gap-3">
                            <div className="status-dot status-online" />
                            <span className="text-sm font-mono text-green-400">ALL SYSTEMS NOMINAL</span>
                        </div>
                    </div>
                </motion.div>

                {/* Alerts Card */}
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-4 holo-panel p-6 relative overflow-hidden"
                    variants={itemVariants}
                    style={{ borderLeft: '3px solid #f59e0b' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={16} className="text-amber-400" />
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                Active Alerts
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold font-display text-white mb-1">
                            2 Warnings
                        </h2>
                        <p className="text-sm text-gray-400 mb-4">Requires attention</p>

                        <div className="flex items-center gap-3">
                            <motion.div
                                className="status-dot status-warning"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-sm font-mono text-amber-400">TURBIDITY SPIKE PREDICTED</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* === AI PREDICTIONS SECTION === */}
            <motion.div
                className="grid grid-cols-12 gap-6 mobile-grid-cols-1"
                variants={itemVariants}
            >
                <div className="col-span-12 lg:col-span-8 holo-panel p-6 relative">
                    {/* Gradient Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 animate-gradient-x" />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex-center">
                                <Zap size={18} className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display">AI Predictions</h3>
                                <p className="text-xs text-gray-500 font-mono">Neural network analysis</p>
                            </div>
                        </div>
                        <span className="tag-cyber tag-purple">
                            <span className="status-dot w-2 h-2" style={{ background: '#bd00ff', boxShadow: '0 0 6px #bd00ff' }} />
                            LIVE MODEL
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Prediction Card 1 */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-500" />
                                    <span className="text-xs text-gray-400 font-mono">02:00 PM - 06:00 PM</span>
                                </div>
                                <span className="tag-cyber tag-success text-[8px] py-0.5">SAFE</span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                Optimal Release Window
                            </h4>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">70% confidence score</p>
                        </div>

                        {/* Prediction Card 2 */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-500" />
                                    <span className="text-xs text-gray-400 font-mono">T-minus 2h 40m</span>
                                </div>
                                <span className="tag-cyber tag-warning text-[8px] py-0.5">ACTION REQ</span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                Coagulant Dosage +5%
                            </h4>
                            <p className="text-xs text-gray-500">
                                Recommended adjustment to counteract predicted turbidity surge from upstream source.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
                    {[
                        { icon: Waves, label: 'Flow Rate', value: '1,247', unit: 'm³/h', trend: '+2.3%', color: 'cyan' },
                        { icon: ThermometerSun, label: 'Temperature', value: '24.5', unit: '°C', trend: '-0.5%', color: 'amber' },
                        { icon: Wind, label: 'Pressure', value: '2.4', unit: 'bar', trend: '+0.1%', color: 'purple' },
                        { icon: BarChart3, label: 'Efficiency', value: '94.2', unit: '%', trend: '+1.2%', color: 'green' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="holo-panel p-4 flex flex-col justify-between"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon size={16} className={`text-${stat.color}-400`} style={{ color: stat.color === 'cyan' ? '#00f2ff' : stat.color === 'amber' ? '#f59e0b' : stat.color === 'purple' ? '#bd00ff' : '#22c55e' }} />
                                <ArrowUpRight size={12} className="text-green-400" />
                            </div>
                            <div>
                                <span className="text-2xl font-bold font-display text-white">{stat.value}</span>
                                <span className="text-xs text-gray-500 ml-1">{stat.unit}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-1">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* === LIVE GAUGES SECTION === */}
            <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex-center">
                        <Activity size={16} className="text-cyan-400" />
                    </div>
                    <h2 className="text-lg font-bold font-display">
                        Real-Time <span className="text-cyan-400">Telemetry</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mobile-grid-cols-2">
                    {liveParameters.map((param, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Gauge
                                label={param.label}
                                value={param.value}
                                unit={param.unit}
                                max={param.max}
                                thresholds={param.thresholds}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* === MAIN CHART === */}
            <motion.div
                className="holo-panel p-6 relative"
                variants={itemVariants}
            >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-bold font-display">Quality Analytics</h2>
                        <p className="text-xs text-gray-500 font-mono">pH / TURBIDITY / COD CORRELATION</p>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/5">
                        {['1H', '8H', '24H', '7D'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeRange(t)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${timeRange === t
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={waterQualityTrends}>
                            <defs>
                                <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ccff00" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorCOD" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bd00ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#bd00ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="time"
                                stroke="#4b5563"
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#4b5563"
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(7, 11, 20, 0.95)',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.7)'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                                labelStyle={{ color: '#9ca3af', fontSize: '11px', marginBottom: '8px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="pH"
                                stroke="#00f2ff"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPh)"
                                dot={false}
                                activeDot={{ r: 6, fill: '#00f2ff', stroke: '#fff', strokeWidth: 2 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="Turbidity"
                                stroke="#ccff00"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTurbidity)"
                                dot={false}
                                activeDot={{ r: 6, fill: '#ccff00', stroke: '#fff', strokeWidth: 2 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="COD"
                                stroke="#bd00ff"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorCOD)"
                                dot={false}
                                activeDot={{ r: 6, fill: '#bd00ff', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-4">
                    {[
                        { color: '#00f2ff', label: 'pH Level' },
                        { color: '#ccff00', label: 'Turbidity' },
                        { color: '#bd00ff', label: 'COD' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                            <span className="text-xs text-gray-400 font-mono">{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* === RECENT ALERTS SECTION === */}
            <AlertsPanel />

            {/* === COMING SOON FEATURES === */}
            <FeaturesSlider />
        </motion.div>
    );
};

export default Dashboard;
