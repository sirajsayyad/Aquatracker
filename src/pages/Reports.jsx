import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Eye,
  Printer,
  CheckCircle,
  Clock,
  FileCheck,
  FileClock,
  ChevronRight,
  Search,
  FileJson,
  FileSpreadsheet,
  X,
} from "lucide-react";
import { useExport } from "../hooks/useExport";

const Reports = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const { exportToCSV, exportToJSON, generateReport, isExporting, progress } =
    useExport();

  const reports = [
    {
      id: 1,
      title: "December 2025 Compliance Report",
      type: "compliance",
      date: "Jan 5, 2026",
      status: "completed",
      size: "2.4 MB",
      pages: 24,
    },
    {
      id: 2,
      title: "Q4 2025 Water Quality Summary",
      type: "quarterly",
      date: "Jan 3, 2026",
      status: "completed",
      size: "5.1 MB",
      pages: 48,
    },
    {
      id: 3,
      title: "Weekly Operations Report - W1",
      type: "weekly",
      date: "Jan 2, 2026",
      status: "completed",
      size: "1.2 MB",
      pages: 12,
    },
    {
      id: 4,
      title: "Incident Report - Station C1 pH Alert",
      type: "incident",
      date: "Jan 1, 2026",
      status: "pending",
      size: "0.8 MB",
      pages: 8,
    },
    {
      id: 5,
      title: "November 2025 Compliance Report",
      type: "compliance",
      date: "Dec 5, 2025",
      status: "completed",
      size: "2.2 MB",
      pages: 22,
    },
    {
      id: 6,
      title: "Annual Audit Report 2025",
      type: "audit",
      date: "Dec 1, 2025",
      status: "completed",
      size: "8.5 MB",
      pages: 86,
    },
    {
      id: 7,
      title: "Equipment Maintenance Log Q4",
      type: "maintenance",
      date: "Nov 28, 2025",
      status: "completed",
      size: "3.2 MB",
      pages: 34,
    },
    {
      id: 8,
      title: "Environmental Impact Assessment",
      type: "audit",
      date: "Nov 15, 2025",
      status: "draft",
      size: "4.8 MB",
      pages: 52,
    },
  ];

  const reportTypes = [
    { key: "all", label: "All Reports" },
    { key: "compliance", label: "Compliance" },
    { key: "quarterly", label: "Quarterly" },
    { key: "weekly", label: "Weekly" },
    { key: "incident", label: "Incident" },
    { key: "audit", label: "Audit" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} className="text-green-400" />;
      case "pending":
        return <Clock size={14} className="text-amber-400" />;
      default:
        return <FileClock size={14} className="text-gray-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
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
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-center">
            <FileText size={24} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display">
              Compliance Reports
            </h1>
            <p className="text-sm text-gray-500 font-mono">
              {reports.length} total reports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-[250px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowExportModal(true)}
          >
            <Download size={16} />
            Export
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("Generating new report...")}
          >
            <FileCheck size={16} />
            Generate Report
          </motion.button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setSelectedType(type.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedType === type.key
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Reports",
            value: reports.length,
            icon: FileText,
            color: "cyan",
          },
          {
            label: "Completed",
            value: reports.filter((r) => r.status === "completed").length,
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Pending",
            value: reports.filter((r) => r.status === "pending").length,
            icon: Clock,
            color: "amber",
          },
          { label: "This Month", value: 4, icon: Calendar, color: "purple" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="holo-panel p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <stat.icon
              size={20}
              style={{
                color:
                  stat.color === "cyan"
                    ? "#00f2ff"
                    : stat.color === "green"
                      ? "#22c55e"
                      : stat.color === "amber"
                        ? "#f59e0b"
                        : "#bd00ff",
              }}
            />
            <div className="text-2xl font-bold text-white font-display mt-2">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Reports Table */}
      <motion.div
        className="holo-panel overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-4 border-b border-white/5">
          <h3 className="text-lg font-bold font-display">Report History</h3>
        </div>

        <div className="divide-y divide-white/5">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-center">
                <FileText size={18} className="text-cyan-400" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                  {report.title}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {report.date}
                  </span>
                  <span>{report.pages} pages</span>
                  <span>{report.size}</span>
                </div>
              </div>

              <span
                className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border ${getStatusStyle(report.status)}`}
              >
                {getStatusIcon(report.status)}
                {report.status.toUpperCase()}
              </span>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => alert("Viewing: " + report.title)}
                >
                  <Eye size={14} />
                </motion.button>
                <motion.button
                  className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex-center text-cyan-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    alert(
                      "Downloading: " + report.title + " (" + report.size + ")",
                    )
                  }
                >
                  <Download size={14} />
                </motion.button>
                <motion.button
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-center text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => alert("Printing: " + report.title)}
                >
                  <Printer size={14} />
                </motion.button>
              </div>

              <ChevronRight size={16} className="text-gray-600" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExportModal(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101]"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15, 20, 35, 0.98), rgba(8, 12, 22, 0.98))",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 80px -10px rgba(0, 0, 0, 0.8)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-display">
                    Export Reports
                  </h3>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex-center text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <motion.button
                    onClick={() => {
                      exportToCSV(
                        filteredReports.map((r) => ({
                          Title: r.title,
                          Type: r.type,
                          Date: r.date,
                          Status: r.status,
                          Size: r.size,
                          Pages: r.pages,
                        })),
                        "aquatracker_reports",
                      );
                      setShowExportModal(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex-center">
                      <FileSpreadsheet size={20} className="text-green-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                        Export as CSV
                      </div>
                      <div className="text-xs text-gray-500">
                        Spreadsheet format
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      exportToJSON(filteredReports, "aquatracker_reports");
                      setShowExportModal(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex-center">
                      <FileJson size={20} className="text-amber-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        Export as JSON
                      </div>
                      <div className="text-xs text-gray-500">
                        Data interchange format
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      generateReport({
                        title: "AquaTracker Reports Summary",
                        subtitle: `${filteredReports.length} reports • Generated on ${new Date().toLocaleString()}`,
                        sections: [
                          {
                            title: "Report Statistics",
                            type: "metrics",
                            data: [
                              {
                                label: "Total Reports",
                                value: filteredReports.length,
                              },
                              {
                                label: "Completed",
                                value: filteredReports.filter(
                                  (r) => r.status === "completed",
                                ).length,
                              },
                              {
                                label: "Pending",
                                value: filteredReports.filter(
                                  (r) => r.status === "pending",
                                ).length,
                              },
                            ],
                          },
                          {
                            title: "Report List",
                            type: "table",
                            headers: [
                              "Title",
                              "Type",
                              "Date",
                              "Status",
                              "Pages",
                            ],
                            rows: filteredReports.map((r) => [
                              r.title,
                              r.type,
                              r.date,
                              r.status,
                              r.pages,
                            ]),
                          },
                        ],
                      });
                      setShowExportModal(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex-center">
                      <Printer size={20} className="text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        Generate Print Report
                      </div>
                      <div className="text-xs text-gray-500">
                        Formatted HTML for printing
                      </div>
                    </div>
                  </motion.button>
                </div>

                {isExporting && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>Exporting...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Reports;
