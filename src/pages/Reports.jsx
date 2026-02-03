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
import { useLanguage } from "../context/LanguageContext";

const Reports = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { t } = useLanguage();
  const { exportToCSV, exportToJSON, generateReport, isExporting, progress } =
    useExport();

  // Generate dynamic report content based on report type
  const getReportContent = (report) => {
    if (!report) return null;

    // Seeded random number generator based on report ID
    const seededRandom = (seed, index) => {
      const x = Math.sin(seed * 9999 + index * 1000) * 10000;
      return x - Math.floor(x);
    };

    // Generate unique parameter values for each report
    const generateParameterValue = (baseValue, range, reportId, paramIndex) => {
      const variation = seededRandom(reportId, paramIndex) * range - (range / 2);
      return Math.round((baseValue + variation) * 10) / 10;
    };

    // Generate unique trend for each report
    const generateTrend = (reportId, paramIndex) => {
      const value = (seededRandom(reportId, paramIndex + 100) * 40 - 20).toFixed(1);
      return value >= 0 ? `+${value}%` : `${value}%`;
    };

    // Base parameters with ranges for variation
    const baseParameters = [
      { parameter: "pH Level", unit: "", standardMin: 6.5, standardMax: 8.5, baseValue: 7.2, variationRange: 1.5 },
      { parameter: "Turbidity", unit: "NTU", standardMin: 0, standardMax: 20, baseValue: 8, variationRange: 15 },
      { parameter: "Dissolved Oxygen", unit: "mg/L", standardMin: 5, standardMax: 15, baseValue: 8, variationRange: 6 },
      { parameter: "COD", unit: "mg/L", standardMin: 0, standardMax: 50, baseValue: 35, variationRange: 40 },
      { parameter: "BOD", unit: "mg/L", standardMin: 0, standardMax: 25, baseValue: 15, variationRange: 20 },
      { parameter: "TDS", unit: "ppm", standardMin: 0, standardMax: 400, baseValue: 280, variationRange: 200 },
      { parameter: "Temperature", unit: "°C", standardMin: 10, standardMax: 30, baseValue: 24, variationRange: 10 },
      { parameter: "Colorimetric", unit: "Pt-Co", standardMin: 0, standardMax: 50, baseValue: 25, variationRange: 30 },
    ];

    // Generate unique values for this specific report
    const monitoredParameters = baseParameters.map((param, index) => ({
      parameter: param.parameter,
      unit: param.unit,
      standardMin: param.standardMin,
      standardMax: param.standardMax,
      currentValue: generateParameterValue(param.baseValue, param.variationRange, report.id, index),
      trend: generateTrend(report.id, index)
    }));

    // Check if value is within standard range
    const getStatus = (current, min, max) => {
      if (current >= min && current <= max) return "compliant";
      if (current < min * 0.8 || current > max * 1.2) return "critical";
      return "warning";
    };

    // Report type specific content
    const reportTypes = {
      compliance: {
        title: "Water Quality Compliance Report",
        subtitle: "Regulatory Standards Assessment",
        description: "This report evaluates water quality parameters against regulatory standards set by environmental agencies.",
        sections: [
          { title: "Compliance Summary", type: "summary" },
          { title: "Parameter Analysis", type: "parameters" },
          { title: "Regulatory Standards", type: "standards" },
        ]
      },
      quarterly: {
        title: "Quarterly Water Quality Summary",
        subtitle: "Q4 2025 Performance Analysis",
        description: "Comprehensive analysis of water quality trends and system performance over the quarter.",
        sections: [
          { title: "Quarter Overview", type: "summary" },
          { title: "Parameter Trends", type: "parameters" },
          { title: "Station Performance", type: "stations" },
        ]
      },
      weekly: {
        title: "Weekly Operations Report",
        subtitle: "Week 1, January 2026",
        description: "Weekly summary of operational metrics, equipment status, and parameter readings.",
        sections: [
          { title: "Week Summary", type: "summary" },
          { title: "Daily Readings", type: "parameters" },
          { title: "Equipment Status", type: "equipment" },
        ]
      },
      incident: {
        title: "Incident Investigation Report",
        subtitle: "Parameter Threshold Breach Analysis",
        description: "Detailed investigation of parameter exceedances and corrective actions taken.",
        sections: [
          { title: "Incident Details", type: "incident" },
          { title: "Affected Parameters", type: "parameters" },
          { title: "Corrective Actions", type: "actions" },
        ]
      },
      audit: {
        title: "System Audit Report",
        subtitle: "Annual Compliance Audit 2025",
        description: "Comprehensive audit of water monitoring systems, procedures, and compliance status.",
        sections: [
          { title: "Audit Findings", type: "summary" },
          { title: "Parameter Review", type: "parameters" },
          { title: "Recommendations", type: "recommendations" },
        ]
      },
      maintenance: {
        title: "Maintenance Log Report",
        subtitle: "Equipment & Sensor Maintenance",
        description: "Record of maintenance activities, calibrations, and equipment health status.",
        sections: [
          { title: "Maintenance Summary", type: "maintenance" },
          { title: "Sensor Calibration", type: "parameters" },
          { title: "Upcoming Schedule", type: "schedule" },
        ]
      }
    };

    const content = reportTypes[report.type] || reportTypes.compliance;

    return {
      ...content,
      parameters: monitoredParameters.map(p => ({
        ...p,
        status: getStatus(p.currentValue, p.standardMin, p.standardMax)
      })),
      report
    };
  };

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
              {t("complianceReports")}
            </h1>
            <p className="text-sm text-gray-500 font-mono">
              {reports.length} {t("totalReports")}
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
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedType === type.key
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
              onClick={() => setSelectedReport(report)}
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

      {/* Report Viewer Modal */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl max-h-[90vh] z-[101] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(15, 20, 35, 0.98), rgba(8, 12, 22, 0.98))",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 80px -10px rgba(0, 0, 0, 0.8)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-center">
                      <FileText size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {selectedReport.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {selectedReport.date}
                        </span>
                        <span>{selectedReport.pages} pages</span>
                        <span>{selectedReport.size}</span>
                        <span className={`px-2 py-0.5 rounded-full border ${getStatusStyle(selectedReport.status)}`}>
                          {selectedReport.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => alert("Downloading: " + selectedReport.title)}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => alert("Printing: " + selectedReport.title)}
                    >
                      <Printer size={16} />
                      Print
                    </motion.button>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="w-10 h-10 rounded-lg bg-white/5 flex-center text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Report Content */}
                {(() => {
                  const content = getReportContent(selectedReport);
                  if (!content) return null;

                  return (
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                      {/* Report Title - Dynamic based on type */}
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
                        <p className="text-sm text-gray-400">{content.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-2 max-w-2xl mx-auto">{content.description}</p>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {content.parameters.filter(p => p.status === "compliant").length}
                          </div>
                          <div className="text-xs text-gray-400">Compliant</div>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-amber-400">
                            {content.parameters.filter(p => p.status === "warning").length}
                          </div>
                          <div className="text-xs text-gray-400">Warning</div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-red-400">
                            {content.parameters.filter(p => p.status === "critical").length}
                          </div>
                          <div className="text-xs text-gray-400">Critical</div>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-cyan-400">{content.parameters.length}</div>
                          <div className="text-xs text-gray-400">Total Parameters</div>
                        </div>
                      </div>

                      {/* Monitored Parameters Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border border-white/10 bg-cyan-900/30 px-4 py-3 text-left text-sm font-bold text-white">
                                Parameter
                              </th>
                              <th className="border border-white/10 bg-cyan-900/30 px-4 py-3 text-center text-sm font-bold text-white">
                                Current Value
                              </th>
                              <th className="border border-white/10 bg-cyan-900/30 px-4 py-3 text-center text-sm font-bold text-white">
                                Standard Range
                              </th>
                              <th className="border border-white/10 bg-cyan-900/30 px-4 py-3 text-center text-sm font-bold text-white">
                                Status
                              </th>
                              <th className="border border-white/10 bg-cyan-900/30 px-4 py-3 text-center text-sm font-bold text-white">
                                Trend
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.parameters.map((param, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                                <td className="border border-white/10 px-4 py-3 text-sm">
                                  <span className="text-white font-medium">{param.parameter}</span>
                                  {param.unit && <span className="text-gray-500 ml-1">({param.unit})</span>}
                                </td>
                                <td className="border border-white/10 px-4 py-3 text-center text-sm">
                                  <span className={`font-bold ${param.status === "compliant" ? "text-green-400" :
                                    param.status === "warning" ? "text-amber-400" : "text-red-400"
                                    }`}>
                                    {param.currentValue} {param.unit}
                                  </span>
                                </td>
                                <td className="border border-white/10 px-4 py-3 text-center text-sm text-gray-300">
                                  {param.standardMin} - {param.standardMax} {param.unit}
                                </td>
                                <td className="border border-white/10 px-4 py-3 text-center text-sm">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${param.status === "compliant"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : param.status === "warning"
                                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}>
                                    {param.status === "compliant" ? "✓ Compliant" :
                                      param.status === "warning" ? "⚠ Warning" : "✗ Critical"}
                                  </span>
                                </td>
                                <td className="border border-white/10 px-4 py-3 text-center text-sm">
                                  <span className={param.trend.startsWith("+") ? "text-green-400" : "text-red-400"}>
                                    {param.trend}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Report Type Specific Info */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {content.sections.map((section, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-cyan-400 mb-2">{section.title}</h4>
                            <p className="text-xs text-gray-400">
                              {section.type === "summary" && "Overall analysis and key findings from the monitoring period."}
                              {section.type === "parameters" && "Detailed breakdown of all monitored water quality parameters."}
                              {section.type === "standards" && "Comparison against regulatory compliance requirements."}
                              {section.type === "stations" && "Performance metrics for each monitoring station."}
                              {section.type === "equipment" && "Equipment health and operational status."}
                              {section.type === "incident" && "Timeline and details of the incident occurrence."}
                              {section.type === "actions" && "Corrective measures implemented and planned."}
                              {section.type === "recommendations" && "Suggested improvements for system optimization."}
                              {section.type === "maintenance" && "Scheduled and completed maintenance activities."}
                              {section.type === "schedule" && "Upcoming maintenance and calibration schedule."}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Note */}
                      <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                        <p className="text-xs text-gray-400">
                          <span className="text-cyan-400 font-bold">Report Generated:</span> {selectedReport.date} |
                          <span className="text-cyan-400 font-bold ml-2">Type:</span> {selectedReport.type.charAt(0).toUpperCase() + selectedReport.type.slice(1)} Report |
                          <span className="text-cyan-400 font-bold ml-2">Pages:</span> {selectedReport.pages}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
