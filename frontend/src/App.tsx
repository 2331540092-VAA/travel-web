import AppRoutes from "./routes";
import "leaflet/dist/leaflet.css";
import ThemeProvider from "./components/theme/ThemeProvider";
import ThemeEffects from "./components/theme/ThemeEffects";

function App() {
  return (
    <ThemeProvider>
      <ThemeEffects />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
