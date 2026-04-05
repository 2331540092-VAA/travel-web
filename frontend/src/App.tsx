import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;
