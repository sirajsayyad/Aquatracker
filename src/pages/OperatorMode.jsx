import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobilePerformance from "../hooks/useMobilePerformance";
import {
    Sliders,
    Power,
    Play,
    Pause,
    AlertTriangle,
    CheckCircle,
    Activity,
    Gauge,
    Droplets,
    Wind,
    Thermometer,
    Clock,
    User,
    ChevronRight,
    RefreshCw,
    Shield,
    Zap,
    Settings2,
    ToggleLeft,
    ToggleRight,
    CircleDot,
    Waves,
    Beaker,
    Fan,
    ArrowUpDown,
    History,
    Terminal,
    AlertCircle,
    XCircle,
} from "lucide-react";

// Mock data for operator controls
const systemEquipment = {
    pumps: [
        { id: "P001", name: "Main Inlet Pump", status: "running", speed: 85, flowRate: 1250, zone: "Intake" },
        { id: "P002", name: "Transfer Pump A", status: "running", speed: 72, flowRate: 890, zone: "Treatment" },
        { id: "P003", name: "Transfer Pump B", status: "stopped", speed: 0, flowRate: 0, zone: "Treatment" },
        { id: "P004", name: "Backwash Pump", status: "standby", speed: 0, flowRate: 0, zone: "Filtration" },
        { id: "P005", name: "Distribution Pump", status: "running", speed: 90, flowRate: 1450, zone: "Output" },
    ],
    valves: [
        { id: "V001", name: "Inlet Valve", position: 100, status: "open", zone: "Intake" },
        { id: "V002", name: "Bypass Valve", position: 0, status: "closed", zone: "Intake" },
        { id: "V003", name: "Treatment Inlet", position: 85, status: "open", zone: "Treatment" },
        { id: "V004", name: "Filter Inlet", position: 100, status: "open", zone: "Filtration" },
        { id: "V005", name: "Distribution Valve", position: 75, status: "open", zone: "Output" },
    ],
    dosingSystems: [
        { id: "D001", name: "Chlorine Dosing", rate: 2.5, unit: "mg/L", status: "active", zone: "Treatment" },
        { id: "D002", name: "Coagulant", rate: 15, unit: "mg/L", status: "active", zone: "Treatment" },
        { id: "D003", name: "pH Adjuster", rate: 0, unit: "mg/L", status: "standby", zone: "Treatment" },
    ],
    aerators: [
        { id: "A001", name: "Aeration Blower 1", status: "running", power: 75, oxygenLevel: 6.8 },
        { id: "A002", name: "Aeration Blower 2", status: "standby", power: 0, oxygenLevel: 0 },
    ],
};

const actionLog = [
    { id: 1, action: "Pump P001 speed adjusted to 85%", operator: "Operator A", time: "2 min ago", type: "control" },
    { id: 2, action: "Valve V003 opened to 85%", operator: "Operator A", time: "5 min ago", type: "control" },
    { id: 3, action: "Chlorine dosing rate increased", operator: "System", time: "12 min ago", type: "auto" },
    { id: 4, action: "Maintenance mode disabled", operator: "Supervisor", time: "25 min ago", type: "system" },
    { id: 5, action: "Pump P003 stopped for maintenance", operator: "Operator B", time: "1 hour ago", type: "control" },
];

const quickCommands = [
    { id: 1, name: "Start All Pumps", icon: Play, color: "green" },
    { id: 2, name: "Stop All Pumps", icon: Pause, color: "red" },
    { id: 3, name: "Reset Alarms", icon: RefreshCw, color: "amber" },
    { id: 4, name: "Maintenance Mode", icon: Settings2, color: "purple" },
];

const OperatorMode = () => {
    const { isMobile, reduceMotion } = useMobilePerformance();
    const [activeZone, setActiveZone] = useState("all");
    const [equipment, setEquipment] = useState(systemEquipment);
    const [notification, setNotification] = useState(null);
    const [alertCount, setAlertCount] = useState(2);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [emergencyMode, setEmergencyMode] = useState(false);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: reduceMotion ? 1 : 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.03 : 0.08,
                delayChildren: isMobile ? 0.05 : 0.1,
            },
        },
    }), [isMobile, reduceMotion]);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: isMobile ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] },
        },
    }), [isMobile, reduceMotion]);

    const zones = ["all", "Intake", "Treatment", "Filtration", "Output"];

    const getStatusColor = (status) => {
        switch (status) {
            case "running":
            case "active":
            case "open":
                return "text-green-400";
            case "stopped":
            case "closed":
                return "text-red-400";
            case "standby":
                return "text-amber-400";
            default:
                return "text-gray-400";
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case "running":
            case "active":
            case "open":
                return "bg-green-500/10 border-green-500/30";
            case "stopped":
            case "closed":
                return "bg-red-500/10 border-red-500/30";
            case "standby":
                return "bg-amber-500/10 border-amber-500/30";
            default:
                return "bg-gray-500/10 border-gray-500/30";
        }
    };

    const togglePump = (pumpId) => {
        const pump = equipment.pumps.find(p => p.id === pumpId);
        const newStatus = pump?.status === "running" ? "stopped" : "running";
        setEquipment((prev) => ({
            ...prev,
            pumps: prev.pumps.map((p) =>
                p.id === pumpId
                    ? {
                        ...p,
                        status: newStatus,
                        speed: newStatus === "running" ? 75 : 0,
                        flowRate: newStatus === "running" ? 850 : 0,
                    }
                    : p
            ),
        }));
        showNotification(`Pump ${pumpId} ${newStatus}`, newStatus === "running" ? "success" : "warning");
    };

    const toggleValve = (valveId) => {
        setEquipment((prev) => ({
            ...prev,
            valves: prev.valves.map((valve) =>
                valve.id === valveId
                    ? {
                        ...valve,
                        status: valve.status === "open" ? "closed" : "open",
                        position: valve.status === "open" ? 0 : 100,
                    }
                    : valve
            ),
        }));
        showNotification(`Valve ${valveId} ${equipment.valves.find(v => v.id === valveId)?.status === "open" ? "closed" : "opened"}`, "success");
    };

    // Notification helper
    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Quick Commands handlers
    const startAllPumps = () => {
        setEquipment((prev) => ({
            ...prev,
            pumps: prev.pumps.map((pump) => ({
                ...pump,
                status: "running",
                speed: 75,
                flowRate: 850,
            })),
        }));
        showNotification("All pumps started successfully!", "success");
    };

    const stopAllPumps = () => {
        setEquipment((prev) => ({
            ...prev,
            pumps: prev.pumps.map((pump) => ({
                ...pump,
                status: "stopped",
                speed: 0,
                flowRate: 0,
            })),
        }));
        showNotification("All pumps stopped!", "warning");
    };

    const resetAlarms = () => {
        setAlertCount(0);
        showNotification("All alarms reset successfully!", "success");
    };

    const toggleMaintenanceMode = () => {
        setMaintenanceMode((prev) => !prev);
        showNotification(
            maintenanceMode ? "Maintenance mode disabled" : "Maintenance mode enabled",
            maintenanceMode ? "success" : "warning"
        );
    };

    const handleQuickCommand = (cmdId) => {
        switch (cmdId) {
            case 1: startAllPumps(); break;
            case 2: stopAllPumps(); break;
            case 3: resetAlarms(); break;
            case 4: toggleMaintenanceMode(); break;
            default: break;
        }
    };

    // Emergency Stop - Stops ALL systems immediately
    const emergencyStopAll = () => {
        setEmergencyMode(true);

        // Stop all pumps
        setEquipment((prev) => ({
            ...prev,
            pumps: prev.pumps.map((pump) => ({
                ...pump,
                status: "stopped",
                speed: 0,
                flowRate: 0,
            })),
            // Close all valves
            valves: prev.valves.map((valve) => ({
                ...valve,
                status: "closed",
                position: 0,
            })),
            // Deactivate all dosing systems
            dosingSystems: prev.dosingSystems.map((ds) => ({
                ...ds,
                status: "stopped",
                rate: 0,
            })),
            // Stop all aerators
            aerators: prev.aerators.map((aerator) => ({
                ...aerator,
                status: "stopped",
                power: 0,
            })),
        }));

        setAlertCount((prev) => prev + 1);
        showNotification("⚠️ EMERGENCY STOP ACTIVATED - All systems halted!", "warning");
    };

    // Reset Emergency Mode
    const resetEmergencyMode = () => {
        setEmergencyMode(false);
        showNotification("Emergency mode reset. Systems ready for restart.", "success");
    };

    const filteredPumps =
        activeZone === "all"
            ? equipment.pumps
            : equipment.pumps.filter((p) => p.zone === activeZone);
    const filteredValves =
        activeZone === "all"
            ? equipment.valves
            : equipment.valves.filter((v) => v.zone === activeZone);

    const runningCount = equipment.pumps.filter((p) => p.status === "running").length;
    const totalPumps = equipment.pumps.length;

    return (
        <motion.div
            className="space-y-6 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* === NOTIFICATION TOAST === */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className={`fixed top-6 left-1/2 z-[100] px-6 py-3 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-lg ${notification.type === "success"
                            ? "bg-green-500/20 border-green-500/50 text-green-400"
                            : notification.type === "warning"
                                ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                                : "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                            }`}
                    >
                        {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <span className="font-medium">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* === HEADER === */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                        <Sliders size={28} className="text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-display">
                            Operator <span className="text-orange-400">Control</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-mono">SYSTEM CONTROL PANEL</p>
                    </div>
                </div>

                {/* Emergency Stop */}
                <motion.button
                    className={`px-6 py-3 rounded-xl border-2 font-bold flex items-center gap-2 transition-all ${emergencyMode
                            ? "bg-red-500 border-red-400 text-white animate-pulse"
                            : "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                        }`}
                    whileHover={{ scale: emergencyMode ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={emergencyMode ? resetEmergencyMode : emergencyStopAll}
                >
                    <Power size={20} />
                    {emergencyMode ? "RESET EMERGENCY" : "EMERGENCY STOP"}
                </motion.button>
            </motion.div>

            {/* === SYSTEM STATUS CARDS === */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Activity, label: "System Health", value: maintenanceMode ? "MAINT" : "98.5%", color: maintenanceMode ? "amber" : "green", status: maintenanceMode ? "MAINTENANCE" : "OPTIMAL" },
                    { icon: Droplets, label: "Active Pumps", value: `${runningCount}/${totalPumps}`, color: "cyan", status: "RUNNING" },
                    { icon: Gauge, label: "Total Flow", value: "3,590 m³/h", color: "purple", status: "NORMAL" },
                    { icon: AlertTriangle, label: "Active Alerts", value: String(alertCount), color: alertCount > 0 ? "amber" : "green", status: alertCount > 0 ? "WARNING" : "CLEAR" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        className="holo-panel p-4 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon
                                size={18}
                                style={{
                                    color:
                                        stat.color === "green" ? "#22c55e" :
                                            stat.color === "cyan" ? "#00f2ff" :
                                                stat.color === "purple" ? "#bd00ff" : "#f59e0b",
                                }}
                            />
                            <span
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${stat.color === "green" ? "bg-green-500/10 text-green-400" :
                                    stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                                        stat.color === "purple" ? "bg-purple-500/10 text-purple-400" :
                                            "bg-amber-500/10 text-amber-400"
                                    }`}
                            >
                                {stat.status}
                            </span>
                        </div>
                        <p className="text-2xl font-bold font-display text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* === ZONE FILTER === */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {zones.map((zone) => (
                    <button
                        key={zone}
                        onClick={() => setActiveZone(zone)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeZone === zone
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {zone === "all" ? "All Zones" : zone}
                    </button>
                ))}
            </motion.div>

            {/* === MAIN CONTROL GRID === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PUMP CONTROLS */}
                <motion.div variants={itemVariants} className="lg:col-span-2 holo-panel p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Waves size={20} className="text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-display">Pump Controls</h3>
                            <p className="text-xs text-gray-500 font-mono">{filteredPumps.length} UNITS</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredPumps.map((pump) => (
                            <motion.div
                                key={pump.id}
                                className={`p-4 rounded-xl border ${getStatusBg(pump.status)} flex flex-wrap items-center gap-4`}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex-1 min-w-[150px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-gray-500">{pump.id}</span>
                                        <span className={`text-xs font-bold uppercase ${getStatusColor(pump.status)}`}>
                                            {pump.status}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white">{pump.name}</p>
                                    <p className="text-xs text-gray-500">{pump.zone}</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-white">{pump.speed}%</p>
                                        <p className="text-[10px] text-gray-500 font-mono">SPEED</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-cyan-400">{pump.flowRate}</p>
                                        <p className="text-[10px] text-gray-500 font-mono">m³/h</p>
                                    </div>
                                    <motion.button
                                        onClick={() => togglePump(pump.id)}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${pump.status === "running"
                                            ? "bg-green-500/20 border border-green-500/50 text-green-400"
                                            : "bg-red-500/20 border border-red-500/50 text-red-400"
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {pump.status === "running" ? <Pause size={20} /> : <Play size={20} />}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* QUICK COMMANDS + ACTION LOG */}
                <motion.div variants={itemVariants} className="space-y-6">
                    {/* Quick Commands */}
                    <div className="holo-panel p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                <Zap size={20} className="text-purple-400" />
                            </div>
                            <h3 className="text-lg font-bold font-display">Quick Commands</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {quickCommands.map((cmd) => (
                                <motion.button
                                    key={cmd.id}
                                    onClick={() => handleQuickCommand(cmd.id)}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${cmd.color === "green" ? "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20" :
                                        cmd.color === "red" ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" :
                                            cmd.color === "amber" ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20" :
                                                "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <cmd.icon size={20} />
                                    <span className="text-[10px] font-mono text-center">{cmd.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Action Log */}
                    <div className="holo-panel p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                                <History size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display">Action Log</h3>
                                <p className="text-xs text-gray-500 font-mono">RECENT OPERATIONS</p>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[250px] overflow-y-auto no-scrollbar">
                            {actionLog.map((log) => (
                                <div key={log.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                                            <User size={10} />
                                            {log.operator}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-mono flex items-center gap-1">
                                            <Clock size={10} />
                                            {log.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white">{log.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* === VALVE CONTROLS === */}
            <motion.div variants={itemVariants} className="holo-panel p-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <ArrowUpDown size={20} className="text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-display">Valve Controls</h3>
                        <p className="text-xs text-gray-500 font-mono">{filteredValves.length} UNITS</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredValves.map((valve) => (
                        <motion.div
                            key={valve.id}
                            className={`p-4 rounded-xl border ${getStatusBg(valve.status)}`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-gray-500">{valve.id}</span>
                                        <span className={`text-xs font-bold uppercase ${getStatusColor(valve.status)}`}>
                                            {valve.status}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white">{valve.name}</p>
                                </div>
                                <motion.button
                                    onClick={() => toggleValve(valve.id)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {valve.status === "open" ? (
                                        <ToggleRight size={32} className="text-green-400" />
                                    ) : (
                                        <ToggleLeft size={32} className="text-red-400" />
                                    )}
                                </motion.button>
                            </div>

                            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${valve.position}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-mono">{valve.position}% OPEN</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* === DOSING SYSTEMS === */}
            <motion.div variants={itemVariants} className="holo-panel p-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                        <Beaker size={20} className="text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-display">Chemical Dosing Systems</h3>
                        <p className="text-xs text-gray-500 font-mono">{equipment.dosingSystems.length} SYSTEMS</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {equipment.dosingSystems.map((dosing) => (
                        <motion.div
                            key={dosing.id}
                            className={`p-5 rounded-xl border ${getStatusBg(dosing.status)}`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-mono text-gray-500">{dosing.id}</span>
                                <span className={`text-xs font-bold uppercase ${getStatusColor(dosing.status)}`}>
                                    {dosing.status}
                                </span>
                            </div>
                            <p className="text-base font-bold text-white mb-4">{dosing.name}</p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-pink-400">{dosing.rate}</p>
                                    <p className="text-xs text-gray-500 font-mono">{dosing.unit}</p>
                                </div>
                                <motion.button
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ADJUST
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OperatorMode;
