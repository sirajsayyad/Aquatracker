import { useState, useCallback } from "react";

// Hook for exporting data to various formats
export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Export to CSV
  const exportToCSV = useCallback((data, filename = "export") => {
    setIsExporting(true);
    setProgress(0);

    try {
      // Convert data to CSV format
      if (!data || data.length === 0) {
        throw new Error("No data to export");
      }

      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(","),
        ...data.map((row, index) => {
          setProgress(((index + 1) / data.length) * 100);
          return headers
            .map((header) => {
              const value = row[header];
              // Handle values with commas or quotes
              if (
                typeof value === "string" &&
                (value.includes(",") || value.includes('"'))
              ) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value ?? "";
            })
            .join(",");
        }),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${filename}_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setProgress(100);
      return { success: true, message: "CSV exported successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setProgress(0);
      }, 500);
    }
  }, []);

  // Export to JSON
  const exportToJSON = useCallback((data, filename = "export") => {
    setIsExporting(true);
    setProgress(50);

    try {
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${filename}_${new Date().toISOString().split("T")[0]}.json`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setProgress(100);
      return { success: true, message: "JSON exported successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setProgress(0);
      }, 500);
    }
  }, []);

  // Generate printable HTML report
  const generateReport = useCallback((reportData) => {
    setIsExporting(true);
    setProgress(25);

    const {
      title = "AquaTracker Report",
      subtitle = "",
      sections = [],
      footer = "",
    } = reportData;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', system-ui, sans-serif; 
            background: #f5f5f5; 
            padding: 40px;
            color: #333;
        }
        .report { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header { 
            text-align: center; 
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #00f2ff;
        }
        .header h1 { 
            color: #0891b2; 
            font-size: 28px;
            margin-bottom: 8px;
        }
        .header p { color: #666; font-size: 14px; }
        .section { margin-bottom: 30px; }
        .section h2 { 
            color: #333; 
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
        }
        table { 
            width: 100%; 
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #eee;
        }
        th { 
            background: #f8f9fa; 
            font-weight: 600;
            color: #555;
        }
        .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .metric-card {
            background: linear-gradient(135deg, #f8f9fa, #fff);
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #eee;
        }
        .metric-card .label { font-size: 12px; color: #888; text-transform: uppercase; }
        .metric-card .value { font-size: 24px; font-weight: 700; color: #0891b2; }
        .metric-card .unit { font-size: 14px; color: #666; }
        .footer { 
            margin-top: 40px; 
            text-align: center; 
            color: #888; 
            font-size: 12px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        @media print {
            body { background: white; padding: 0; }
            .report { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="report">
        <div class="header">
            <h1>${title}</h1>
            <p>${subtitle || `Generated on ${new Date().toLocaleDateString()}`}</p>
        </div>
        ${sections
          .map(
            (section) => `
            <div class="section">
                <h2>${section.title}</h2>
                ${
                  section.type === "metrics"
                    ? `
                    <div class="metric-grid">
                        ${section.data
                          .map(
                            (m) => `
                            <div class="metric-card">
                                <div class="label">${m.label}</div>
                                <div class="value">${m.value}<span class="unit">${m.unit || ""}</span></div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
                    : section.type === "table"
                      ? `
                    <table>
                        <thead>
                            <tr>${section.headers.map((h) => `<th>${h}</th>`).join("")}</tr>
                        </thead>
                        <tbody>
                            ${section.rows
                              .map(
                                (row) => `
                                <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                `
                      : `<p>${section.content}</p>`
                }
            </div>
        `,
          )
          .join("")}
        <div class="footer">
            ${footer || "AquaTracker™ - Water Quality Management System"}
        </div>
    </div>
</body>
</html>`;

    setProgress(75);

    // Open in new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setProgress(100);
    setTimeout(() => {
      setIsExporting(false);
      setProgress(0);
    }, 500);

    return { success: true, message: "Report generated successfully" };
  }, []);

  return {
    isExporting,
    progress,
    exportToCSV,
    exportToJSON,
    generateReport,
  };
};

export default useExport;
