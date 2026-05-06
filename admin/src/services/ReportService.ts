const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/reports`;

const ReportService = {
  async getStats(from: string, to: string) {
    const res = await fetch(`${API_URL}/stats?from=${from}&to=${to}`);
    if (!res.ok) throw new Error("Failed to fetch report stats");
    return res.json();
  },

  getExportUrl(from: string, to: string) {
    return `${API_URL}/export-pdf?from=${from}&to=${to}`;
  },
};

export default ReportService;



