const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin`;

async function request(url: string, options: RequestInit = {}) {
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

  if (res.status === 204) return true;

  return res.json();
}

export interface Theme {
  id?: number;
  name: string;
  slug?: string;
  type: string;
  banner_url?: string | null;
  logo_url?: string | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  accent_color?: string | null;
  description?: string | null;
  config?: Record<string, any> | null;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const ThemeService = {
  async getThemes(): Promise<Theme[]> {
    return request(`${API_URL}/themes`);
  },

  async getTheme(id: number): Promise<Theme> {
    return request(`${API_URL}/themes/${id}`);
  },

  async createTheme(data: Partial<Theme>) {
    return request(`${API_URL}/themes`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTheme(id: number, data: Partial<Theme>) {
    return request(`${API_URL}/themes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteTheme(id: number) {
    return request(`${API_URL}/themes/${id}`, {
      method: "DELETE",
    });
  },

  async toggleActive(id: number) {
    return request(`${API_URL}/themes/${id}/toggle-active`, {
      method: "PATCH",
    });
  },
};

export default ThemeService;



