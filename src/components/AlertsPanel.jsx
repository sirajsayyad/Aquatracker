import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertOctagon,
  X,
  ExternalLink,
} from "lucide-react";
import { recentAlerts } from "../data/mockData";

const AlertsPanel = () => {
  const navigate = useNavigate();
  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle size={16} className="text-amber-400" />;
      case "success":
        return <CheckCircle size={16} className="text-green-400" />;
      case "danger":
        return <AlertOctagon size={16} className="text-red-400" />;
      default:
        return <Info size={16} className="text-cyan-400" />;
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case "warning":
        return "border-l-amber-500 hover:border-amber-500/50";
      case "success":
        return "border-l-green-500 hover:border-green-500/50";
      case "danger":
        return "border-l-red-500 hover:border-red-500/50";
      default:
        return "border-l-cyan-500 hover:border-cyan-500/50";
    }
  };

  return (
    <motion.div
      className="holo-panel p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex-center relative">
            <Bell size={18} className="text-amber-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold flex-center text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]">
              {recentAlerts.length}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">Recent Alerts</h3>
            <p className="text-xs text-gray-500 font-mono">
              System notifications
            </p>
          </div>
        </div>

        <motion.button
          className="text-xs text-cyan-400 hover:underline font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/alerts")}
        >
          View All
        </motion.button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {recentAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className={`p-4 rounded-xl bg-white/5 border-l-2 border border-white/5 transition-all group cursor-pointer ${getAlertStyles(alert.type)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                    {alert.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono whitespace-nowrap">
                    {alert.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                  {alert.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                    {alert.station}
                  </span>
                  <motion.button
                    className="opacity-0 group-hover:opacity-100 text-xs text-cyan-400 flex items-center gap-1 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/alerts")}
                  >
                    Details <ExternalLink size={10} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AlertsPanel;
