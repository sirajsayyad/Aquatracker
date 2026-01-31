import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  Download,
} from "lucide-react";
import { liveParameters, parameterTrends } from "../data/mockData";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LiveMonitor = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30M");

  const parameterConfig = {
    pH: { color: "#00f2ff", unit: "", min: 6, max: 9, label: "pH Level" },
    Turbidity: {
      color: "#ccff00",
      unit: "NTU",
      min: 0,
      max: 5,
      label: "Turbidity",
    },
    DO: {
      color: "#22c55e",
      unit: "mg/L",
      min: 4,
      max: 10,
      label: "Dissolved O₂",
    },
    COD: { color: "#f59e0b", unit: "mg/L", min: 30, max: 80, label: "COD" },
    BOD: { color: "#bd00ff", unit: "mg/L", min: 5, max: 20, label: "BOD" },
    Temp: {
      color: "#ef4444",
      unit: "°C",
      min: 20,
      max: 35,
      label: "Temperature",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getLatestValue = (paramKey) => {
    const data = parameterTrends[paramKey];
    return data ? data[data.length - 1]?.value : 0;
  };

  const getTrend = (paramKey) => {
    const data = parameterTrends[paramKey];
    if (!data || data.length < 2) return 0;
    return (
      ((data[data.length - 1].value - data[data.length - 2].value) /
        data[data.length - 2].value) *
      100
    ).toFixed(1);
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
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-center">
            <Activity size={24} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display">Live Monitor</h1>
            <p className="text-sm text-gray-500 font-mono">
              Real-time parameter tracking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/5">
            {["5M", "15M", "30M", "1H", "6H"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeRange(t)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedTimeRange === t
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <motion.button
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => alert("Refreshing live data...")}
          >
            <RefreshCw size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Parameter Graphs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(parameterConfig).map(([key, config], index) => (
          <motion.div
            key={key}
            className="holo-panel p-5 relative group"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">{config.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-2xl font-bold font-display"
                    style={{ color: config.color }}
                  >
                    {getLatestValue(key)}
                  </span>
                  <span className="text-xs text-gray-500">{config.unit}</span>

                  {/* Trend Indicator */}
                  {parseFloat(getTrend(key)) >= 0 ? (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <TrendingUp size={12} />
                      <span>+{getTrend(key)}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400 text-xs">
                      <TrendingDown size={12} />
                      <span>{getTrend(key)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    alert("Expanding " + config.label + " chart...")
                  }
                >
                  <Maximize2 size={14} />
                </motion.button>
                <motion.button
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    alert("Downloading " + config.label + " data...")
                  }
                >
                  <Download size={14} />
                </motion.button>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={parameterTrends[key]}>
                  <defs>
                    <linearGradient
                      id={`gradient-${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={config.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={config.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.03)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#4b5563"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[config.min, config.max]}
                    stroke="#4b5563"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(7, 11, 20, 0.95)",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                    itemStyle={{ color: config.color }}
                    formatter={(value) => [
                      `${value} ${config.unit}`,
                      config.label,
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={config.color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${key})`}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: config.color,
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Threshold Indicators */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-500">Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] text-gray-500">Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] text-gray-500">Critical</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-600 font-mono">LIVE</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div className="holo-panel p-6" variants={itemVariants}>
        <h3 className="text-lg font-bold font-display mb-4">System Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
              Parameters Monitored
            </span>
            <div className="text-2xl font-bold text-white mt-1">6</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
              Data Points/Min
            </span>
            <div className="text-2xl font-bold text-cyan-400 mt-1">120</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
              Active Sensors
            </span>
            <div className="text-2xl font-bold text-green-400 mt-1">24</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
              Uptime
            </span>
            <div className="text-2xl font-bold text-purple-400 mt-1">99.9%</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LiveMonitor;
