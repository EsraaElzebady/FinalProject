import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "@fontsource/urbanist";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/700.css";
import AppRoutes from "./Routes/Router";

createRoot(document.getElementById("root")).render(<AppRoutes />);
