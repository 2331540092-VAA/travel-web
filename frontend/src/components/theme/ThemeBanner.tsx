import { useTheme } from "./ThemeProvider";

export default function ThemeBanner() {
  const { theme } = useTheme();

  if (!theme || !theme.banner_url) return null;

  return (
    <div className="theme-banner relative w-full overflow-hidden rounded-2xl mb-6">
      <img
        src={theme.banner_url}
        alt={theme.name}
        className="w-full h-48 md:h-64 object-cover"
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${theme.primary_color || "#e74c3c"}33, ${theme.secondary_color || "#f39c12"}33)`,
        }}
      >
        <div className="text-center text-white drop-shadow-lg">
          {theme.logo_url && (
            <img src={theme.logo_url} alt="" className="w-16 h-16 mx-auto mb-2" />
          )}
          <h2 className="text-2xl md:text-3xl font-bold">{theme.name}</h2>
          {theme.description && (
            <p className="mt-2 text-sm md:text-base opacity-90">{theme.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
