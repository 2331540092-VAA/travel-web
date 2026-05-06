import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface ThemeData {
  id: number;
  name: string;
  slug: string;
  type: string;
  banner_url: string | null;
  logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  description: string | null;
  config: Record<string, any> | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
}

interface ThemeContextType {
  theme: ThemeData | null;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  loading: true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

const API_BASE = import.meta.env.VITE_API_BASE ? `${import.meta.env.VITE_API_BASE}/api` : "http://127.0.0.1:8000/api";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/themes/active`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setTheme(data);
        }
      })
      .catch((err) => console.error("Failed to load theme:", err))
      .finally(() => setLoading(false));
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      if (theme.primary_color) root.style.setProperty("--theme-primary", theme.primary_color);
      if (theme.secondary_color) root.style.setProperty("--theme-secondary", theme.secondary_color);
      if (theme.accent_color) root.style.setProperty("--theme-accent", theme.accent_color);
      document.body.setAttribute("data-theme", theme.type);
    } else {
      const root = document.documentElement;
      root.style.removeProperty("--theme-primary");
      root.style.removeProperty("--theme-secondary");
      root.style.removeProperty("--theme-accent");
      document.body.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
