const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin`;
async function request(url, options = {}) {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        ...options,
    });
    if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        throw new Error(`Request failed: ${res.status}`);
    }
    if (res.status === 204)
        return true;
    return res.json();
}
const ThemeService = {
    async getThemes() {
        return request(`${API_URL}/themes`);
    },
    async getTheme(id) {
        return request(`${API_URL}/themes/${id}`);
    },
    async createTheme(data) {
        return request(`${API_URL}/themes`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
    async updateTheme(id, data) {
        return request(`${API_URL}/themes/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },
    async deleteTheme(id) {
        return request(`${API_URL}/themes/${id}`, {
            method: "DELETE",
        });
    },
    async toggleActive(id) {
        return request(`${API_URL}/themes/${id}/toggle-active`, {
            method: "PATCH",
        });
    },
};
export default ThemeService;
