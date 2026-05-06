const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin`;
const DashboardService = {
    async getStats() {
        const res = await fetch(`${API_URL}/dashboard/stats`);
        if (!res.ok) {
            throw new Error("Failed to fetch dashboard stats");
        }
        return await res.json();
    },
};
export default DashboardService;
