import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    PieChart,
    Calendar,
    Download,
    Filter,
    RefreshCw,
    ArrowUpRight,
    Droplets,
    Activity,
    Zap
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RechartsPie,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('7D');

    // Mock data for analytics
    const weeklyTrends = [
        { day: 'Mon', pH: 7.2, turbidity: 1.8, efficiency: 92 },
        { day: 'Tue', pH: 7.1, turbidity: 2.0, efficiency: 89 },
        { day: 'Wed', pH: 7.4, turbidity: 1.5, efficiency: 95 },
        { day: 'Thu', pH: 7.3, turbidity: 1.7, efficiency: 93 },
        { day: 'Fri', pH: 7.2, turbidity: 1.9, efficiency: 91 },
        { day: 'Sat', pH: 7.0, turbidity: 2.2, efficiency: 88 },
        { day: 'Sun', pH: 7.1, turbidity: 1.6, efficiency: 94 },
    ];

    const complianceData = [
        { name: 'Compliant', value: 85, color: '#22c55e' },
        { name: 'Warning', value: 10, color: '#f59e0b' },
        { name: 'Non-Compliant', value: 5, color: '#ef4444' },
    ];

    const parameterComparison = [
        { parameter: 'pH Level', current: 92, target: 95 },
        { parameter: 'Turbidity', current: 88, target: 90 },
        { parameter: 'DO', current: 95, target: 90 },
        { parameter: 'COD', current: 78, target: 85 },
        { parameter: 'BOD', current: 90, target: 88 },
    ];

    const radarData = [
        { subject: 'Water Quality', A: 92, fullMark: 100 },
        { subject: 'Efficiency', A: 88, fullMark: 100 },
        { subject: 'Compliance', A: 95, fullMark: 100 },
        { subject: 'Safety', A: 97, fullMark: 100 },
        { subject: 'Uptime', A: 99, fullMark: 100 },
        { subject: 'Response', A: 85, fullMark: 100 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-6 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div
                className="flex flex-wrap items-center justify-between gap-4"
                variants={itemVariants}
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex-center">
                        <BarChart3 size={24} className="text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-display">Advanced Analytics</h1>
                        <p className="text-sm text-gray-500 font-mono">Data insights & trends</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mobile-flex-col mobile-w-full">
                    <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/5 mobile-time-selector mobile-w-full">
                        {['24H', '7D', '30D', '90D'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeRange(t)}
                                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${timeRange === t
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <motion.button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => alert('Exporting analytics data for ' + timeRange + '...')}
                    >
                        <Download size={16} />
                        Export
                    </motion.button>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mobile-grid-cols-1">
                {[
                    { label: 'Avg. WQI Score', value: '92.4', trend: '+3.2%', icon: Droplets, color: 'cyan' },
                    { label: 'Treatment Efficiency', value: '94.1%', trend: '+1.8%', icon: Activity, color: 'green' },
                    { label: 'Compliance Rate', value: '98.5%', trend: '+0.5%', icon: BarChart3, color: 'purple' },
                    { label: 'Energy Usage', value: '2,450 kWh', trend: '-5.2%', icon: Zap, color: 'amber' },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        className="holo-panel p-5"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <kpi.icon size={20} style={{ color: kpi.color === 'cyan' ? '#00f2ff' : kpi.color === 'green' ? '#22c55e' : kpi.color === 'purple' ? '#bd00ff' : '#f59e0b' }} />
                            <div className={`flex items-center gap-1 text-xs ${kpi.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {kpi.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {kpi.trend}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white font-display">{kpi.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Trends Chart */}
                <motion.div className="holo-panel p-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold font-display mb-4">Weekly Trend Analysis</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyTrends}>
                                <defs>
                                    <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                                <XAxis dataKey="day" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(7, 11, 20, 0.95)',
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Area type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={2} fill="url(#colorEfficiency)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Compliance Pie Chart */}
                <motion.div className="holo-panel p-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold font-display mb-4">Compliance Overview</h3>
                    <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={complianceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {complianceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </RechartsPie>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Parameter Comparison */}
                <motion.div className="holo-panel p-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold font-display mb-4">Parameter vs Target</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={parameterComparison} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                                <XAxis type="number" domain={[0, 100]} stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                                <YAxis dataKey="parameter" type="category" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} width={80} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(7, 11, 20, 0.95)',
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="current" fill="#00f2ff" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="target" fill="rgba(255,255,255,0.2)" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Radar Chart */}
                <motion.div className="holo-panel p-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold font-display mb-4">System Performance Radar</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <Radar name="Performance" dataKey="A" stroke="#bd00ff" fill="#bd00ff" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Analytics;
